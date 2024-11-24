import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    console.log('Elementos del carrito al inicializar:', this.cartItems); // Log para verificar
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    console.log('Carrito vaciado'); // Log para verificar
  }
}
