import { Component } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  correoElectronico = 'alejandro.quindimil.cancio@gmail.com';

  // constructor(private toastr: ToastrService) {}

  copiarCorreo() {
    const correoElectronicoElement = document.getElementById('correo-electronico');
    if (correoElectronicoElement) {
      const correoElectronicoText = correoElectronicoElement.textContent;
      if (correoElectronicoText) {
        navigator.clipboard.writeText(correoElectronicoText);
        // this.toastr.success('Correo electrónico copiado!');
        alert('Correo electrónico copiado!');
      }
    }
  }

}

  

