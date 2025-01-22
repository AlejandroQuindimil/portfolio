import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  public aboutme: string = 'Sobre mi';
  public education: string = 'Educación';
  public experience: string = 'Experiencia';
  public proyects: string = 'Proyectos';
  public contact: string = 'Contacto';
  public cv: string = 'Curriculum';

  isMobile: boolean = false;
  menuOpen: boolean = false;

  constructor() {
    this.checkScreenSize();
  }

  // Detecta el tamaño de la pantalla al cargar la página o cambiar su tamaño
  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768; // Cambia a móvil si el ancho es menor o igual a 768px
    console.log('isMobile:', this.isMobile)
  }

  // Alterna el estado del menú móvil
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
