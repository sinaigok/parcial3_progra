import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Asegúrate de importar el Router
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
  totalCarrito: number = 0; // Variable para almacenar el total del carrito

  constructor(private cartService: CartService, private router: Router) {} // Inyecta el Router

  ngOnInit() {
    this.cargarCarrito(); // Cargar el carrito desde el local storage
    this.calcularTotal(); // Calcular el total del carrito
    console.log('Elementos del carrito al inicializar:', this.cartItems); // Log para verificar
  }

  cargarCarrito() {
    this.cartItems = JSON.parse(localStorage.getItem('carrito') || '[]');
    this.calcularTotal(); // Calcular el total del carrito después de cargar los elementos
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    localStorage.removeItem('carrito'); // Limpiar el local storage
    this.totalCarrito = 0; // Reiniciar el total del carrito
    console.log('Carrito vaciado'); // Log para verificar
  }

  removeItem(eventoId: string) {
    this.cartItems = this.cartItems.filter(item => item.eventoId !== eventoId);
    localStorage.setItem('carrito', JSON.stringify(this.cartItems));
    this.calcularTotal(); // Recalcular el total del carrito
    console.log(`Evento con ID: ${eventoId} eliminado del carrito`); // Log para verificar
  }

  calcularTotal() {
    this.totalCarrito = this.cartItems.reduce((total, item) => total + item.precioTotal, 0);
  }

  irACheckout() {
    this.router.navigate(['/checkout']); // Navega a la página de checkout
  }

  verDetalle(eventoId: string) {
    this.router.navigate(['/evento', eventoId]); // Navega a la página del detalle del evento
  }
}
