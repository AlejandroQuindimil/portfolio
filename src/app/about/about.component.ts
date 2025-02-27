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
  public summaryAbout: string = 'Soy una persona proactiva y apasionada por el desarrollo de software y la tecnología. Mi objetivo es crear soluciones innovadoras y funcionales, enfrentando desafíos que me permitan seguir mejorando mis habilidades y conocimientos.';
  public summaryAbout2: string = 'Durante mis prácticas profesionales, participé activamente en el desarrollo de funcionalidades en fronted utilizando Java, JavaScript y Angular, así como en el mantenimiento de bases de datos con Node.js y MongoDB. Además, trabajé en pruebas y depuración de código para garantizar la calidad del software. Me comprometo profundamente con cada proyecto, desde la planificación hasta su implementación, siempre enfocado en la excelencia y la mejora continua.';
  public summaryAbout3: string = '';

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

}
