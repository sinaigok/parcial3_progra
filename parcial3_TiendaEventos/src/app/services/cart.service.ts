import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      console.log('Carrito cargado desde localStorage:', this.cart); // Log para verificar
    }
  }

  addToCart(evento: any) {
    this.cart.push(evento);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    console.log('Carrito actualizado:', this.cart); // Log para verificar
  }

  getCartItems() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
    localStorage.setItem('cart', JSON.stringify(this.cart)); // Asegurarse de actualizar localStorage
    console.log('Carrito vacío:', this.cart); // Log para verificar
  }
}
