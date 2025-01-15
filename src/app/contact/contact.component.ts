import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  public next: string = '¿Qué sigue?';
  public contactme: string = '¡Pongámonos en contacto!';
  public contact_text: string = 'Estaré encantado de recibir tu contacto si quieres hablar sobre nuevas oportunidades. Escríbeme, y te responderé tan pronto como vea tu mensaje. ';
  public contactme2: string = 'Ponte en contacto';
  public dmlinkedin: string = 'DM on Linkedin';



}
