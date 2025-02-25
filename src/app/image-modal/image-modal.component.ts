import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent {
  @Input() imageUrl: string = '';
  isVisible: boolean = false;

  open(image: string) {
    this.imageUrl = image;
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }
}