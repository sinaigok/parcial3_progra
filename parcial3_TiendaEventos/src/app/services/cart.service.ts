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
      try {
        this.cart = JSON.parse(storedCart);
        console.log('Carrito cargado desde localStorage:', this.cart);
      } catch (error) {
        console.error('Error al cargar el carrito desde localStorage:', error);
      }
    }
  }

  private saveCart() {
    try {
      localStorage.setItem('cart', JSON.stringify(this.cart));
      console.log('Carrito guardado en localStorage:', this.cart);
    } catch (error) {
      console.error('Error al guardar el carrito en localStorage:', error);
    }
  }

  addToCart(evento: any) {
    const cantidadEntradas = Number(evento.cantidadEntradas);
    const precio = Number(evento.price);
  
    // Validación adicional para asegurar que sean números válidos
    if (isNaN(cantidadEntradas) || isNaN(precio)) {
      console.error(`Valores inválidos para ${evento.name}: cantidadEntradas o precio`);
      return;
    }
  
    const item = {
      eventoId: evento.id,
      nombre: evento.name,
      fecha: evento.date,
      lugar: evento.location,
      categoria: evento.category,
      cantidadEntradas: cantidadEntradas,
      precio: precio,
      precioTotal: cantidadEntradas * precio
    };
  
    if (isNaN(item.precioTotal)) {
      console.error(`Precio total inválido para ${item.nombre}`);
      return;
    }
  
    this.cart.push(item);
    this.saveCart();
    console.log('Carrito actualizado:', this.cart);
  }
  

  getCartItems() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
    this.saveCart(); // Guardar el carrito vacío en localStorage
    console.log('Carrito vacío:', this.cart);
  }
}
