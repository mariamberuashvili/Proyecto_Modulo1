import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  async login(email: string, password: string) {

  const user = await this.authService.login({ email, password });

  if (!user) {
    console.error('Login incorrecto');
    return;
  }

  const token = await user.user.getIdToken();

  this.userService.setToken(token);

  this.router.navigateByUrl('/home');
}
  
}