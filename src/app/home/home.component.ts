import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { AboutComponent } from '../about/about.component';
import { ExperienceComponent } from '../experience/experience.component';
import { ProyectsComponent } from '../proyects/proyects.component';
import { OtherproyectsComponent } from '../otherproyects/otherproyects.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, AboutComponent, ExperienceComponent, ProyectsComponent, OtherproyectsComponent, ContactComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {}
