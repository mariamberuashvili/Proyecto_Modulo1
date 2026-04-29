import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chuleton } from '../../models/interfaces';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {

  steaks: Chuleton[] = [
    { id: 1, tipo: 'Beef', origen: 'Scotland', precio: 45, peso: 1.2, cantidad: 0 },
    { id: 2, tipo: 'Chicken', origen: 'Scotland', precio: 38, peso: 1.0, cantidad: 0 },
     { id: 3, tipo: 'Pork', origen: 'Scotland', precio: 50, peso: 1.5, cantidad: 0 },
    { id: 4, tipo: 'Porki', origen: 'Scotland', precio: 50, peso: 1.5, cantidad: 0 }
  ];

  cartItems: number = 0;
  totalPrice: number = 0;

  addToCart(steak: Chuleton) {
    steak.cantidad++;
    this.cartItems++;
    this.totalPrice += steak.precio;
  }

  removeFromCart(steak: Chuleton) {
    if (steak.cantidad > 0) {
      steak.cantidad--;
      this.cartItems--;
      this.totalPrice -= steak.precio;
    }
  }

  clearCart() {
    this.steaks.forEach(s => s.cantidad = 0);
    this.cartItems = 0;
    this.totalPrice = 0;
  }
   private authService = inject(AuthService);
  private router = inject(Router);

  async logout() {
    await this.authService.logout();

    
    localStorage.removeItem('token');

    await this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}