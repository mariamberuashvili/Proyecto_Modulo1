import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink], 
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  async register(name: string, email: string, pass: string, confirm: string) {
  
    if (!name || !email || !pass) {
      alert("Por favor, rellena todos los campos");
      return;
    }

    if (pass !== confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
     
      const user = await this.authService.register({ email, password: pass });

      if (user) {
        
        alert("¡Registro correcto! Bienvenido.");
        
        this.router.navigateByUrl('/login');
      } else {
        alert("Error: No se pudo crear el usuario.");
      }
    } catch (error: unknown) {
      console.error(error);
     
      
    }
  }
}