import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
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

  

}
