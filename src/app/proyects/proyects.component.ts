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
  images = [
    '/descarga.jpg',
    '/descarga1.jpg'
  ];
  currentIndex = 0;

  images2 = [
    '/descarga.jpg',
    '/descarga1.jpg'
  ];
  currentIndex2 = 0;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateTransform('--current-index1', this.currentIndex);
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateTransform('--current-index1', this.currentIndex);
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
}
