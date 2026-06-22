import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  github?: string;
  inDevelopment?: boolean;
}

@Component({
  selector: 'app-otherproyects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './otherproyects.component.html',
  styleUrls: ['./otherproyects.component.css']
})
export class OtherproyectsComponent implements OnDestroy {

  public titleotherproyect1: string = '🦠 Malaria Detector';
  public otherproyect1: string = 'Malaria Detector es una web app basada en Machine Learning que utiliza una Red Neuronal Convolucional (CNN) para la detección de malaria en imágenes microscópicas de células. Aprovecha el poder de TensorFlow y OpenCV para lograr una precisión del 95% en la clasificación de células infectadas y no infectadas.';
  public infootherproyect1: string = 'Clasificar imágenes microscópicas de células como infectadas o no infectadas, proporcionando una herramienta de detección temprana de malaria.';
  public otherproyect3: string = 'Idiomas';
  public otherproyect4: string = 'Idiomas';


  public projects: Project[] = [
    {
      title: this.titleotherproyect1,
      description: this.otherproyect1,
      tags: ['Python', 'TensorFlow & Keras', 'OpenCV (cv2)', 'Matplotlib & Seaborn', 'Scikit-learn'],
      link: 'https://www.kaggle.com/code/alexquindi/detecting-malaria-cnn-95-accuracy',
      github: '#',
      inDevelopment: false
    },
    {
      title: '📊 Proyecto 2',
      description: this.otherproyect1,
      tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
      link: '#',
      github: '#',
      inDevelopment: true 
    },
    {
      title: '🌐 Proyecto 3',
      description: this.otherproyect1,
      tags: ['Angular', 'TypeScript', 'HTML5', 'CSS3'],
      link: '#',
      github: '#',
      inDevelopment: true 
    },
    {
      title: '🤖 Proyecto 4',
      description: this.otherproyect1,
      tags: ['Python', 'TensorFlow & Keras', 'Scikit-learn'],
      link: '#',
      github: '#',
      inDevelopment: true 
    },
    {
      title: '📱 Proyecto 5',
      description: this.otherproyect1,
      tags: ['Angular', 'TypeScript', 'Bootstrap'],
      link: '#',
      github: '#',
      inDevelopment: true 
    },
    {
      title: '🦠 Proyecto 6',
      description: this.otherproyect1,
      tags: ['Python', 'OpenCV (cv2)', 'Matplotlib & Seaborn'],
      link: '',
      github: '#',
      inDevelopment: true 
    }
  ];

  // Track "extendido" con un clon del último al inicio y un clon del primero al final.
  public extendedProjects: Project[] = [];

  // Índice dentro de extendedProjects (empieza en 1 = primer proyecto real)
  public trackIndex: number = 1;

  // Índice "real" (0-based) para los puntos indicadores
  public currentIndex: number = 0;

  // Controla si la transición CSS está activa (se desactiva durante el salto invisible)
  public transitionEnabled: boolean = true;


  private isTransitioning: boolean = false;
  // Watchdog: por si transitionend nunca llega a disparar 
  private transitionWatchdog: any = null;

  public isAutoPlaying: boolean = true;

  private autoPlayIntervalMs: number = 4000;
  // Tiempo de pausa tras interactuar manualmente (flechas, dots, swipe)
  private readonly RESUME_DELAY_MS: number = 3000;
  // Tiempo de pausa tras hacer click en una tarjeta para abrir el proyecto.
  // Más corto porque el usuario probablemente vuelve enseguida a la pestaña.
  private readonly RESUME_DELAY_AFTER_OPEN_MS: number = 1500;
  private autoPlayTimer: any = null;
  private resumeTimeout: any = null;
  private jumpTimeout: any = null;

  // --- Estado para swipe del carrusel (touch / mouse / trackpad) ---
  private pointerStartX: number = 0;
  private pointerStartY: number = 0;
  private isDragging: boolean = false;
  // Público: el template lo consulta para no abrir el proyecto al soltar
  // el dedo/ratón justo después de haber hecho un swipe.
  public dragHandled: boolean = false;
  // Distancia mínima en px para considerar que fue un swipe y no un tap/click
  private readonly SWIPE_THRESHOLD_PX: number = 40;

  // --- Estado para el "scrubber" de puntos (deslizar sobre los dots) ---
 
  public isDraggingDots: boolean = false;
  private dotsTrackEl: HTMLElement | null = null;

  constructor() {
    this.buildExtendedProjects();
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
    }
    if (this.jumpTimeout) {
      clearTimeout(this.jumpTimeout);
    }
    if (this.transitionWatchdog) {
      clearTimeout(this.transitionWatchdog);
    }
  }

  private buildExtendedProjects(): void {
    if (this.projects.length === 0) {
      this.extendedProjects = [];
      return;
    }
    const first = this.projects[0];
    const last = this.projects[this.projects.length - 1];
    this.extendedProjects = [last, ...this.projects, first];
  }

  openProject(url: string) {
    if (url) {
      window.open(url, '_blank');
      this.pauseAutoPlayTemporarily(this.RESUME_DELAY_AFTER_OPEN_MS);
    }
  }

  // --- Navegación manual ---

  // El parámetro `force` distingue entre dos orígenes de la llamada:
  // - Interacción directa del usuario (clic en flecha, swipe): SIEMPRE debe
  //   responder al instante, igual que antes de añadir el guard. Si hay una
  //   transición en curso (p. ej. la del autoplay), la interrumpimos y
  //   tomamos el control, en vez de ignorar el gesto del usuario.
  // - Autoplay automático: respeta el guard estricto (no se fuerza) y NO
  //   pausa/reprograma el propio autoplay (ver advanceSlide más abajo).
  next(force: boolean = true): void {
    if (this.isTransitioning && !force) {
      return;
    }
    this.advanceSlide(1);
    this.pauseAutoPlayTemporarily();
  }

  prev(force: boolean = true): void {
    if (this.isTransitioning && !force) {
      return;
    }
    this.advanceSlide(-1);
    this.pauseAutoPlayTemporarily();
  }

  // Lógica compartida de avance, sin tocar el autoplay: la usan next()/
  // prev() (que sí pausan el autoplay tras la interacción del usuario) y
  // el propio tick del autoplay (que no debe pausarse/reprogramarse a sí
  // mismo en cada paso, o el intervalo real dejaría de ser autoPlayIntervalMs).
  private advanceSlide(direction: 1 | -1): void {
    this.isTransitioning = true;
    this.transitionEnabled = true;
    this.trackIndex += direction;
    this.syncCurrentIndex();
    this.armTransitionWatchdog();
  }

  // Salvaguarda: si transitionend no se dispara (pestaña en background,
  // prefers-reduced-motion, animación interrumpida por el navegador...),
  // liberamos el lock pasado el tiempo que debería durar la transición CSS
  // (0.6s en el CSS) más un margen, para no dejar el carrusel congelado.
  private armTransitionWatchdog(): void {
    if (this.transitionWatchdog) {
      clearTimeout(this.transitionWatchdog);
    }
    this.transitionWatchdog = setTimeout(() => {
      this.transitionWatchdog = null;
      if (this.isTransitioning) {
        this.onTrackTransitionEnd();
      }
    }, 800);
  }

  goTo(index: number): void {
    if (this.dragHandled) {
      return;
    }
    // Saltamos directamente al slide elegido: ya no estamos esperando el
    // transitionend de un next()/prev() anterior con ese trackIndex, así
    // que soltamos el lock para no dejarlo bloqueado por error.
    this.isTransitioning = false;
    if (this.transitionWatchdog) {
      clearTimeout(this.transitionWatchdog);
      this.transitionWatchdog = null;
    }
    this.transitionEnabled = true;
    this.trackIndex = index + 1; // +1 por el clon inicial
    this.currentIndex = index;
    this.pauseAutoPlayTemporarily();
  }

  // Calcula el desplazamiento del track según el índice extendido.
  // Cada slide ocupa SLIDE_WIDTH_PERCENT del viewport; sumamos OFFSET_PERCENT
  // para que el slide activo quede siempre centrado y las vecinas asomen
  // a ambos lados (efecto "peek"). Estos valores deben coincidir con el
  // ancho definido en .carousel-item dentro del CSS (incluido el breakpoint
  // móvil a 768px).
  private get SLIDE_WIDTH_PERCENT(): number {
    return typeof window !== 'undefined' && window.innerWidth <= 768 ? 88 : 76;
  }

  private get OFFSET_PERCENT(): number {
    return (100 - this.SLIDE_WIDTH_PERCENT) / 2;
  }

  get trackTransform(): string {
    const x = this.trackIndex * this.SLIDE_WIDTH_PERCENT - this.OFFSET_PERCENT;
    return `translateX(-${x}%)`;
  }

  private syncCurrentIndex(): void {
    const total = this.projects.length;
    if (total === 0) {
      this.currentIndex = 0;
      return;
    }

    // Defensa contra trackIndex fuera de rango: si por cualquier motivo
    // (transitionend perdido, clics muy rápidos, resize en mal momento)
    // trackIndex se escapó más allá de los clones [0, total+1], lo
    // recolocamos dentro de rango en lugar de dejar el track apuntando a
    // una posición vacía del array extendedProjects.
    if (this.trackIndex < 0) {
      this.trackIndex = total; // último real
    } else if (this.trackIndex > total + 1) {
      this.trackIndex = 1; // primer real
    }

    // trackIndex 0 = clon del último, trackIndex total+1 = clon del primero
    if (this.trackIndex === 0) {
      this.currentIndex = total - 1;
    } else if (this.trackIndex === total + 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex = this.trackIndex - 1;
    }
  }

  // Se llama cuando termina la transición CSS del track (transitionend)
  onTrackTransitionEnd(): void {
    this.isTransitioning = false;
    if (this.transitionWatchdog) {
      clearTimeout(this.transitionWatchdog);
      this.transitionWatchdog = null;
    }

    const total = this.projects.length;

    if (this.trackIndex === 0) {
      // Estábamos en el clon del último -> saltamos sin transición al último real
      this.jumpTo(total);
    } else if (this.trackIndex === total + 1) {
      // Estábamos en el clon del primero -> saltamos sin transición al primero real
      this.jumpTo(1);
    }
  }

  private jumpTo(extendedIndex: number): void {
    this.transitionEnabled = false;
    this.trackIndex = extendedIndex;
    this.syncCurrentIndex();
    // Reactivamos la transición en el siguiente frame para no animar el salto
    if (this.jumpTimeout) {
      clearTimeout(this.jumpTimeout);
    }
    this.jumpTimeout = setTimeout(() => {
      this.transitionEnabled = true;
    }, 20);
  }

  // --- Autoplay ---

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.isAutoPlaying = true;
    this.autoPlayTimer = setInterval(() => {
      // Llamamos a advanceSlide directamente (no a next()): el autoplay
      // respeta el guard isTransitioning pero NO debe pausarse/reprogramarse
      // a sí mismo en cada tick, o el intervalo real dejaría de ser
      // autoPlayIntervalMs y empezaría a derivar.
      if (!this.isTransitioning) {
        this.advanceSlide(1);
      }
    }, this.autoPlayIntervalMs);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
    this.isAutoPlaying = false;
  }

  // Al interactuar manualmente, pausamos el autoplay un momento
  // y luego lo reanudamos para no "pelear" con el usuario.
  private pauseAutoPlayTemporarily(delayMs: number = this.RESUME_DELAY_MS): void {
    this.stopAutoPlay();
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
    }
    this.resumeTimeout = setTimeout(() => {
      this.resumeTimeout = null;
      this.startAutoPlay();
    }, delayMs);
  }

  // Al pasar el ratón por encima, el autoplay debe quedar parado de forma
  // persistente mientras el cursor siga ahí. No basta con detener el
  // setInterval activo (stopAutoPlay): si justo había un resumeTimeout
  // pendiente de una interacción anterior (flecha, swipe, dot), ese timer
  // seguía corriendo en paralelo y reanudaba el autoplay solo a los pocos
  // segundos aunque el cursor siguiera encima de la tarjeta.
  onMouseEnter(): void {
    this.stopAutoPlay();
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
      this.resumeTimeout = null;
    }
  }

  onMouseLeave(): void {
    if (!this.resumeTimeout) {
      this.startAutoPlay();
    }
  }

  // --- Swipe (deslizar izquierda/derecha) ---
  // Funciona tanto sobre las tarjetas del carrusel como sobre la fila de
  // puntos indicadores, usando Pointer Events (cubre touch, mouse y trackpad
  // con un único código).

  onPointerDown(event: PointerEvent): void {
    this.isDragging = true;
    this.dragHandled = false;
    this.pointerStartX = event.clientX;
    this.pointerStartY = event.clientY;
    this.stopAutoPlay();
    // Capturamos el puntero en el elemento sobre el que se inició el gesto
    // (carousel-viewport o carousel-dots). Esto es clave para que, al
    // mantener pulsado sobre un dot/botón hijo, el navegador siga enviando
    // los eventos pointermove/pointerup a ESTE listener en vez de perder el
    // seguimiento o dejar que el botón se quede con el gesto.
    const target = event.currentTarget as HTMLElement;
    if (target && target.setPointerCapture) {
      try {
        target.setPointerCapture(event.pointerId);
      } catch {
        // Si el navegador no permite capturarlo (p. ej. ya liberado), lo ignoramos.
      }
    }
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging || this.dragHandled) {
      return;
    }

    const deltaX = event.clientX - this.pointerStartX;
    const deltaY = event.clientY - this.pointerStartY;

    // Si el movimiento es mayoritariamente vertical, dejamos que el usuario
    // haga scroll de la página con normalidad y no interceptamos el gesto.
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }

    if (Math.abs(deltaX) >= this.SWIPE_THRESHOLD_PX) {
      this.dragHandled = true;
      if (deltaX < 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }

  onPointerUp(event: PointerEvent): void {
    this.isDragging = false;
    const target = event.currentTarget as HTMLElement;
    if (target && target.releasePointerCapture) {
      try {
        target.releasePointerCapture(event.pointerId);
      } catch {
        // Ya liberado o no soportado: lo ignoramos.
      }
    }
    // Si hubo swipe, dejamos dragHandled=true un instante más: el evento
    // 'click' de la tarjeta se dispara justo después de 'pointerup', y así
    // evitamos que un swipe abra el proyecto por error.
    if (this.dragHandled) {
      setTimeout(() => {
        this.dragHandled = false;
      }, 50);
    }
    // Si el puntero (con ratón) sigue dentro del viewport al soltar, el
    // hover manda: solo paramos, sin programar un resume automático que
    // reactivaría el autoplay aunque el cursor siga encima de la tarjeta.
    // matches() puede no existir en entornos muy antiguos, de ahí el chequeo.
    const stillHovering =
      target instanceof HTMLElement &&
      typeof (target as any).matches === 'function' &&
      (target as any).matches(':hover');
    if (stillHovering) {
      this.onMouseEnter();
    } else {
      this.pauseAutoPlayTemporarily();
    }
  }

  // --- Scrubber de puntos (deslizar la fila de dots como un mini slider) ---
  // El dedo/ratón controla directamente qué punto está activo durante todo
  // el arrastre, con feedback inmediato, en vez de esperar a soltar.

  onDotsPointerDown(event: PointerEvent): void {
    this.isDraggingDots = true;
    this.dragHandled = false;
    this.dotsTrackEl = event.currentTarget as HTMLElement;
    this.stopAutoPlay();

    if (this.dotsTrackEl && this.dotsTrackEl.setPointerCapture) {
      try {
        this.dotsTrackEl.setPointerCapture(event.pointerId);
      } catch {
        // Lo ignoramos si el navegador no lo permite.
      }
    }

    // Seleccionamos directamente el punto bajo el dedo/ratón al iniciar
    // el gesto, igual que al hacer click.
    this.updateDotFromPointer(event);
  }

  onDotsPointerMove(event: PointerEvent): void {
    if (!this.isDraggingDots) {
      return;
    }
    // Cualquier movimiento mientras se arrastra cuenta como "manejado",
    // para que el click posterior no vuelva a disparar goTo() por su cuenta.
    this.dragHandled = true;
    this.updateDotFromPointer(event);
  }

  onDotsPointerUp(event: PointerEvent): void {
    this.isDraggingDots = false;
    if (this.dotsTrackEl && this.dotsTrackEl.releasePointerCapture) {
      try {
        this.dotsTrackEl.releasePointerCapture(event.pointerId);
      } catch {
        // Ya liberado o no soportado: lo ignoramos.
      }
    }
    this.dotsTrackEl = null;
    if (this.dragHandled) {
      setTimeout(() => {
        this.dragHandled = false;
      }, 50);
    }
    this.pauseAutoPlayTemporarily();
  }

  // Calcula, según la posición X del puntero relativa a la fila de dots,
  // qué proyecto le corresponde y navega directamente a él (sin animación
  // de "salto" extra: simplemente actualiza el slide activo en el track).
  private updateDotFromPointer(event: PointerEvent): void {
    if (!this.dotsTrackEl || this.projects.length === 0) {
      return;
    }

    const rect = this.dotsTrackEl.getBoundingClientRect();
    if (rect.width === 0) {
      return;
    }

    const relativeX = event.clientX - rect.left;
    const clampedX = Math.min(Math.max(relativeX, 0), rect.width);
    const ratio = clampedX / rect.width;

    const total = this.projects.length;
    let index = Math.floor(ratio * total);
    if (index >= total) {
      index = total - 1;
    }
    if (index < 0) {
      index = 0;
    }

    if (index !== this.currentIndex) {
      this.isTransitioning = false;
      if (this.transitionWatchdog) {
        clearTimeout(this.transitionWatchdog);
        this.transitionWatchdog = null;
      }
      this.transitionEnabled = true;
      this.trackIndex = index + 1; // +1 por el clon inicial
      this.currentIndex = index;
    }
  }
}
