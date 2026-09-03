import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-proyects',
  standalone: true,
  imports: [
    CommonModule,
    ImageModalComponent
  ],
  templateUrl: './proyects.component.html',
  styleUrl: './proyects.component.css'
})
export class ProyectsComponent {
  @ViewChild(ImageModalComponent) imageModal!: ImageModalComponent;

  public titleotherproyect1: string = '🦠 Malaria Detector';
  public otherproyect1: string = 'Malaria Detector es una web app basada en Machine Learning que utiliza una Red Neuronal Convolucional (CNN) para la detección de malaria en imágenes microscópicas de células. Aprovecha el poder de TensorFlow y OpenCV para lograr una precisión del 95% en la clasificación de células infectadas y no infectadas.';
  public infootherproyect1: string = 'Clasificar imágenes microscópicas de células como infectadas o no infectadas, proporcionando una herramienta de detección temprana de malaria.';
  public otherproyect3: string = 'Idiomas';
  public otherproyect4: string = 'Idiomas';
  public resumen_app1: string ='DRIP es un marketplace de moda full-stack inspirado en plataformas como Zalando, donde los usuarios pueden explorar un catálogo de productos, buscar y filtrar por categoría, gestionar favoritos y realizar pedidos con gestión automática de stock.';
  public isDripInDevelopment: boolean = true;

  media = [
  { type: 'image', src: 'diseñomarketplace.png' },
  { type: 'video', src: 'dripportatilvideo.mp4' },
  { type: 'video', src: 'dripversionmovil.mp4' }
  // más vídeos aquí
  ];

  currentIndex = 0;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.media.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.media.length) % this.media.length;
  }
 

  images2 = [
    'descarga.jpg',
    'descarga1.jpg'
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

  openImage(image: string) {
    this.imageModal.open(image);
  }
}
