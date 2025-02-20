import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from "./header/header.component";
import { NavComponent } from "./nav/nav.component";
import { FooterComponent } from "./footer/footer.component";
import { ProyectsComponent } from "./proyects/proyects.component";
import { ContactComponent } from "./contact/contact.component";
import { ExperienceComponent } from "./experience/experience.component";
import { CommonModule } from '@angular/common';
import { OtherproyectsComponent } from './otherproyects/otherproyects.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AboutComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    ProyectsComponent,
    ContactComponent,
    ExperienceComponent,
    OtherproyectsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio';
  isMobile: boolean = false;

  constructor() {
    // Inicializar isMobile basado en el ancho de la ventana
    this.isMobile = window.innerWidth <= 768;

    // Actualizar isMobile cuando cambie el tamaño de la ventana
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });
  }
}
