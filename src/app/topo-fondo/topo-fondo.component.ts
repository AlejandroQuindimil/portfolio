import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';

/** Curvas de nivel verdes a pantalla completa. Lento, sin interacción con el ratón. */
@Component({
  selector: 'app-topo-fondo',
  standalone: true,
  template: '<canvas #canvas></canvas>',
  styles: [`
    :host { position: fixed; inset: 0; z-index: -1; pointer-events: none; }
    canvas { width: 100%; height: 100%; display: block; }
  `],
})
export class TopoFondoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private raf = 0;
  private cleanup: () => void = () => {};

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => this.init());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.cleanup();
  }

  private init(): void {
    const THREE = (window as any).THREE;
    if (!THREE) {
      console.error('THREE no está cargado: revisa el <script> en index.html');
      return;
    }

    const renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.nativeElement, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = { uTime: { value: 0 }, uRes: { value: new THREE.Vector2(1, 1) } };

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms,
      vertexShader: `void main(){ gl_Position = vec4(position, 1.); }`,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uRes;

        float hash(vec3 p){ p = fract(p*.3183099+.1); p *= 17.; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
        float noise(vec3 x){
          vec3 i = floor(x), f = fract(x);
          f = f*f*(3.-2.*f);
          return mix(
            mix(mix(hash(i), hash(i+vec3(1,0,0)), f.x), mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
            mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x), mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y),
            f.z);
        }
        float fbm(vec3 p){ float v=0., a=.5; for(int i=0;i<4;i++){ v+=a*noise(p); p*=2.; a*=.5; } return v; }

        void main(){
          vec2 uv = gl_FragCoord.xy / uRes.y;

          // ---- AJUSTES ----
          // uv*2.0     -> tamaño de las formas (más alto = formas más pequeñas)
          // uTime*.012 -> velocidad (más bajo = más calmado)
          // *16.       -> cantidad de curvas
          float f = fbm(vec3(uv*2., uTime*.012)) * 16.;

          float d = abs(fract(f-.5)-.5) / fwidth(f);
          float line = 1. - smoothstep(.5, 1.9, d);
          float major = step(mod(floor(f+.5), 4.), .5);

          vec3 soft  = vec3(.62, .78, .70);
          vec3 green = vec3(.10, .52, .34);
          // opacidad: .45 líneas finas, .65 líneas marcadas
          gl_FragColor = vec4(mix(soft, green, major), line * mix(.45, .65, major));
        }`,
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      renderer.getDrawingBufferSize(uniforms.uRes.value);
    };
    window.addEventListener('resize', onResize);
    onResize();

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clock = new THREE.Clock();
    const frame = () => {
      if (!document.hidden) {
        uniforms.uTime.value = reduce ? 0 : clock.getElapsedTime();
        renderer.render(scene, camera);
      }
      if (!reduce) this.raf = requestAnimationFrame(frame);
    };
    frame();

    this.cleanup = () => {
      window.removeEventListener('resize', onResize);
      scene.children.forEach((c: any) => c.geometry?.dispose());
      material.dispose();
      renderer.dispose();
    };
  }
}