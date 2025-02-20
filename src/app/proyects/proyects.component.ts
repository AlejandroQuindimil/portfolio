import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proyects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proyects.component.html',
  styleUrl: './proyects.component.css'
})
export class ProyectsComponent {
  public titleotherproyect1: string = '🦠 Malaria Detector';
  public otherproyect1: string = 'Malaria Detector es una web app basada en Machine Learning que utiliza una Red Neuronal Convolucional (CNN) para la detección de malaria en imágenes microscópicas de células. Aprovecha el poder de TensorFlow y OpenCV para lograr una precisión del 95% en la clasificación de células infectadas y no infectadas.';
  public infootherproyect1: string = 'Clasificar imágenes microscópicas de células como infectadas o no infectadas, proporcionando una herramienta de detección temprana de malaria.';
  public otherproyect3: string = 'Idiomas';
  public otherproyect4: string = 'Idiomas';
  public resumen_app1: string ='My Fit Meal es una aplicación innovadora que permite a los usuarios gestionar su alimentación de manera personalizada, calculando su requerimiento calórico y distribuyendo macronutrientes de forma equilibrada. Desarrollada en Ionic con Angular y utilizando Firebase para almacenamiento, ofrece un seguimiento detallado del progreso en tiempo real. Ideal para nutricionistas, deportistas y cualquier persona interesada en mejorar su bienestar, la app facilita la planificación de dietas y optimiza el rendimiento físico. Con un mercado en constante crecimiento, My Fit Meal destaca como un desarrollo tecnológico con gran impacto en la salud digital.';

  images = [
    '/../proyecto1parte1.png',
    '/../proyecto1parte2.png'
  ];
  currentIndex = 0;

  images2 = [
    '/descarga.jpg',
    '/descarga1.jpg'
  ];
  currentIndex2 = 0;

  isMobile: boolean = false;
  isExpanded: boolean[] = [false, false, false];
  hover: boolean[] = [false, false, false];
  clickTimeout: any;

  constructor() {
    this.isMobile = window.innerWidth <= 768;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  next2() {
    this.currentIndex2 = (this.currentIndex2 + 1) % this.images2.length;
    this.updateTransform('--current-index2', this.currentIndex2);
  }

  prev2() {
    this.currentIndex2 = (this.currentIndex2 - 1 + this.images2.length) % this.images2.length;
    this.updateTransform('--current-index2', this.currentIndex2);
  }

  private updateTransform(variable: string, index: number) {
    document.documentElement.style.setProperty(variable, index.toString());
  }

  toggleExpand(index: number) {
    this.isExpanded[index] = !this.isExpanded[index];
    this.hover[index] = false;
  }

  setHover(index: number, value: boolean) {
    this.hover[index] = value;
  }

  openProject(url: string) {
    window.open(url, '_blank');
  }

  handleClick(index: number, url: string) {
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
      this.openProject(url);
    } else {
      this.clickTimeout = setTimeout(() => {
        this.toggleExpand(index);
        this.clickTimeout = null;
      }, 300);
    }
  }
}
