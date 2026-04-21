import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  
  public hello: string = 'Hola! Mi nombre es ';
  public intro: string = 'Soy un Desarrollador enfocado en datos con mentalidad de atleta.';
  public summaryAbout: string = `
  Entiendo el código como una <b>carrera de fondo</b> donde la <b>constancia y la disciplina</b> siempre superan al talento innato. 
  Mi enfoque es simple: cumplir objetivos diarios, evaluar resultados y asegurar la máxima calidad en cada línea que escribo.
  `;

  public summaryAbout2: string = `
    Mi viaje comenzó queriendo entender los mundos virtuales de mi infancia; hoy, esa misma curiosidad me impulsa a optimizar procesos complejos mediante mis conocimientos de programación e <b>IA y Big Data</b>. 
    Gracias a mi formación previa en contabilidad y gestión, aporto una <b>visión 360º</b> que me permite alinear el desarrollo técnico con los objetivos operativos y económicos de la empresa.
  `; 
  public summaryAbout3: string = `
    Mi trayectoria me ha permitido desarrollar una versatilidad real: desde la creación de interfaces <b>Frontend</b> intuitivas y la gestión de ecosistemas de <b>Big Data</b>, hasta la creación de arquitectura <b>Backend</b>. 
    En este portfolio puedes explorar proyectos tanto de <b>Frontend con JavaScript y Angular</b>, como de <b>Backend con Java y Spring Boot</b> o <b>Inteligencia Artificial con Python</b>, que son la <b>implementación práctica de arquitecturas escalables</b>, desarrolladas bajo los estándares de rigor técnico.
  `;

  public summaryAbout4: string = `
    Creo firmemente que un cuerpo entrenado y una mente curiosa rinden mejor ante retos complejos. Por eso, mi día a día se divide entre superar marcas en el gimnasio y resolver bugs en el servidor. 
    <b>Si buscas a alguien con la disciplina necesaria para llevar tus proyectos al siguiente nivel, no dudes en ponerte en contacto.</b>
  `;
  // public hello: string = 'Hola! Mi nombre es ';
  
  dynamicText: string = "";
  phrases: string[] =[
    "Team Player.",
    "Software Developer.",
    "Data Engineer.",
    "Specialised in Big Data and IA",
  ];

  currentPhraseIndex: number = 0;
  currentCharIndex: number = 0;
  isDeleting: boolean = false;
  typingSpeed: number = 100;
  deletingSpeed: number = 100;
  delayBetweenPhrases: number = 2000;

  location = window.location;

  constructor(private titleService: Title) {
    this.titleService.setTitle('BC | Home')
  }


  ngOnInit(): void {
    this.type();
  }

  type() {
    const currentPhrase = this.phrases[this.currentPhraseIndex];
    if (this.isDeleting) {
      this.dynamicText = currentPhrase.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
    } else {
      this.dynamicText = currentPhrase.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
    }

    if (!this.isDeleting && this.currentCharIndex === currentPhrase.length) {
      this.isDeleting = true;
      setTimeout(() => this.type(), this.delayBetweenPhrases);
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      this.isDeleting = false;
      this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
      setTimeout(() => this.type(), 500);
    } else {
      const speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
      setTimeout(() => this.type(), speed);
    }
  }

  copiarAlPortapapeles(texto: string) {
    navigator.clipboard.writeText(texto).then(() => {
      alert('Correo copiado al portapapeles');
    }, (err) => {
      console.error('Error al copiar: ', err);
    });
  }

  enviarCorreo() {
    window.location.href = 'mailto:alejandro.quindimil.cancio@gmail.com';
  }

}
