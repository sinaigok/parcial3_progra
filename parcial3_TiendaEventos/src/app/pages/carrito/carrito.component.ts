import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  cartItems: any[] = [];
  totalCarrito: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cargarCarrito();
    this.calcularTotal();
    console.log('Elementos del carrito al inicializar:', this.cartItems);
  }

  cargarCarrito() {
    this.cartItems = JSON.parse(localStorage.getItem('carrito') || '[]');
    console.log('Carrito cargado:', this.cartItems);
    this.calcularTotal();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    localStorage.removeItem('carrito');
    this.totalCarrito = 0;
    console.log('Carrito vaciado');
  }

  removeItem(eventoId: string) {
    this.cartItems = this.cartItems.filter(item => item.eventoId !== eventoId);
    localStorage.setItem('carrito', JSON.stringify(this.cartItems));
    this.calcularTotal();
    console.log(`Evento con ID: ${eventoId} eliminado del carrito`);
  }

  updateQuantity(eventoId: string, newQuantity: any) {
    const item = this.cartItems.find(item => item.eventoId === eventoId);
    if (item) {
      const cantidadNumerica = Number(newQuantity);
      if (isNaN(cantidadNumerica) || cantidadNumerica < 1) {
        console.log(`Valor inválido para cantidad: ${newQuantity}`);
        return;
      }
      item.cantidadEntradas = cantidadNumerica;
      item.precioTotal = cantidadNumerica * item.precio;

      // Log para verificar precio
      if (isNaN(item.precio)) {
        console.error(`Precio inválido para ${item.nombre}`);
      } else {
        console.log(`Precio válido para ${item.nombre}: ${item.precio}`);
      }
      
      console.log(`Cantidad actualizada para ${item.nombre}: ${item.cantidadEntradas}, Precio Total: ${item.precioTotal}`);
      localStorage.setItem('carrito', JSON.stringify(this.cartItems));
      this.calcularTotal();
    }
  }

  calcularTotal() {
    this.totalCarrito = this.cartItems.reduce((total, item) => total + (item.precioTotal || 0), 0);
    console.log('Total calculado:', this.totalCarrito);
  }

  irACheckout() {
    this.router.navigate(['/checkout']);
  }
}
