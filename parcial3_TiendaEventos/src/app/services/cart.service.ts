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
      console.log('Carrito cargado desde localStorage:', this.cart); 
    }
  }

  addToCart(evento: any) {
    const item = {
      eventoId: evento.id,
      nombre: evento.name,
      lugar: evento.location, // Añadir lugar
      fecha: evento.date,     // Añadir fecha
      cantidadEntradas: evento.cantidadEntradas,
      precio: evento.price,
      precioTotal: evento.cantidadEntradas * evento.price
    };
    this.cart.push(item);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    console.log('Carrito actualizado:', this.cart);
  }

  getCartItems() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
    localStorage.setItem('cart', JSON.stringify(this.cart)); 
    console.log('Carrito vacío:', this.cart); 
  }
}
