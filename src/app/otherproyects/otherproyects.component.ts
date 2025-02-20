import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otherproyects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './otherproyects.component.html',
  styleUrls: ['./otherproyects.component.css']
})
export class OtherproyectsComponent {

  public titleotherproyect1: string = '🦠 Malaria Detector';
  public otherproyect1: string = 'Malaria Detector es una web app basada en Machine Learning que utiliza una Red Neuronal Convolucional (CNN) para la detección de malaria en imágenes microscópicas de células. Aprovecha el poder de TensorFlow y OpenCV para lograr una precisión del 95% en la clasificación de células infectadas y no infectadas.';
  public infootherproyect1: string = 'Clasificar imágenes microscópicas de células como infectadas o no infectadas, proporcionando una herramienta de detección temprana de malaria.';
  public otherproyect3: string = 'Idiomas';
  public otherproyect4: string = 'Idiomas';

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
