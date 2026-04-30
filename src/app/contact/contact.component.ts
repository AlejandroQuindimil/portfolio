import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  // Header texts
  public title: string = '¿Trabajamos juntos?';
  public subtitle: string = 'Estaré encantado de recibir tu contacto si quieres hablar sobre nuevas oportunidades. Escríbeme, y te responderé tan pronto como vea tu mensaje';
  
  // Contact Info
  public contactInfoTitle: string = 'Información de Contacto';
  public contactDescription: string = 'Siempre abierto a discutir nuevos proyectos, ideas creativas o oportunidades para formar parte de tu equipo.';
  
  // Contact details
  public email: string = 'alejandro.quindimil.dev@gmail.com';
  public linkedin: string = 'Alejandro Quindimil';
  public location: string = 'A Coruña Galicia, España';
  
  // Social
  public followMe: string = 'SÍGUEME';
  
  // Form
  public formTitle: string = 'Enviame un mensaje';
  public namePlaceholder: string = 'Tu nombre';
  public emailPlaceholder: string = 'tu@email.com';
  public subjectPlaceholder: string = '¿En qué puedo ayudarte?';
  public messagePlaceholder: string = 'Cuéntame sobre tu proyecto...';
  public sendButton: string = 'Enviar Mensaje';
  
  // Form data
  public formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  // UI States
  public isLoading: boolean = false;
  public formError: string = '';
  public formSuccess: boolean = false;

  // Anti-spam: rate limiting
  private lastSubmitTime: number = 0;
  private readonly MIN_SUBMIT_INTERVAL: number = 60000; // 1 minute between submissions

  // EmailJS configuration loaded from environment (gitignored)
  private readonly SERVICE_ID: string = environment.emailjs.serviceId;
  private readonly TEMPLATE_ID: string = environment.emailjs.templateId;
  private readonly PUBLIC_KEY: string = environment.emailjs.publicKey;

  /**
   * Sanitize input to prevent XSS and injection attacks
   */
  private sanitizeInput(input: string): string {
    if (!input) return '';
    return input
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/"/g, '"')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .replace(/`/g, '&#x60;')
      .trim();
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Check for suspicious patterns in input
   */
  private hasSuspiciousPattern(input: string): boolean {
    const suspiciousPatterns = [
      /<script/i,
      /<button/i,
      /SELECT/i ,
      /INSERT/i ,
      /UPDATE/i ,
      /DELETE/i ,
      /DROP/i ,
      /javascript:/i,
      /on\w+\s*=/i,
      /eval\s*\(/i,
      /expression\s*\(/i,
      /data\s*:/i,
      /vbscript:/i
    ];
    return suspiciousPatterns.some(pattern => pattern.test(input));
  }

  /**
   * Validate form inputs
   */
  private validateForm(): boolean {
    // Check required fields
    if (!this.formData.name?.trim()) {
      this.formError = 'Por favor, introduce tu nombre';
      return false;
    }
    if (!this.formData.email?.trim()) {
      this.formError = 'Por favor, introduce tu email';
      return false;
    }
    if (!this.formData.message?.trim()) {
      this.formError = 'Por favor, introduce un mensaje';
      return false;
    }

    // Validate email format
    if (!this.isValidEmail(this.formData.email)) {
      this.formError = 'Por favor, introduce un email válido';
      return false;
    }

    // Check for suspicious patterns
    if (this.hasSuspiciousPattern(this.formData.name) || 
        this.hasSuspiciousPattern(this.formData.email) ||
        this.hasSuspiciousPattern(this.formData.subject) ||
        this.hasSuspiciousPattern(this.formData.message)) {
      this.formError = 'Se ha detectado contenido sospechoso. Por favor, revisa tu mensaje';
      return false;
    }

    // Check field lengths
    if (this.formData.name.length > 100 || 
        this.formData.email.length > 100 || 
        this.formData.subject.length > 200 || 
        this.formData.message.length > 2000) {
      this.formError = 'Algunos campos exceden el límite de caracteres permitido';
      return false;
    }

    return true;
  }

  /**
   * Anti-spam: Check rate limiting
   */
  private checkRateLimit(): boolean {
    const now: number = Date.now();
    if (now - this.lastSubmitTime < this.MIN_SUBMIT_INTERVAL) {
      const remainingSeconds: number = Math.ceil(
        (this.MIN_SUBMIT_INTERVAL - (now - this.lastSubmitTime)) / 1000
      );
      this.formError = `Por favor, espera ${remainingSeconds} segundo(s) antes de enviar otro mensaje`;
      return false;
    }
    return true;
  }

  async onSubmit() {
    this.formError = '';
    this.formSuccess = false;

    // Anti-spam: rate limiting check
    if (!this.checkRateLimit()) {
      return;
    }

    // Validate form
    if (!this.validateForm()) {
      return;
    }

    // Sanitize all inputs
    const sanitizedData = {
      name: this.sanitizeInput(this.formData.name),
      email: this.sanitizeInput(this.formData.email),
      subject: this.sanitizeInput(this.formData.subject),
      message: this.sanitizeInput(this.formData.message)
    };

    this.isLoading = true;

    try {
      // Check if EmailJS is configured
      if (this.SERVICE_ID === 'tu_service_id' || 
          this.TEMPLATE_ID === 'tu_template_id' || 
          this.PUBLIC_KEY === 'tu_public_key') {
        // Demo mode - show success message (replace with real config from emailjs.com)
        console.log('Demo mode - form data:', sanitizedData);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        alert('Mensaje enviado (demo). Configura EmailJS en contact.component.ts para recibir correos reales.');
      } else {
        // Send email via EmailJS
        await emailjs.send(
          this.SERVICE_ID,
          this.TEMPLATE_ID,
          {
            from_name: sanitizedData.name,
            from_email: sanitizedData.email,
            subject: sanitizedData.subject || 'Sin asunto',
            message: sanitizedData.message
          },
          this.PUBLIC_KEY
        );
      }

      // Update rate limit timestamp
      this.lastSubmitTime = Date.now();
      this.formSuccess = true;
      
      // Reset form
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };

    } catch (error) {
      console.error('Error sending email:', error);
      this.formError = 'Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.';
    } finally {
      this.isLoading = false;
    }
  }
}
