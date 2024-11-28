import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirmacion-compra',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './confirmacioncompra.component.html',
  styleUrls: ['./confirmacioncompra.component.scss']
})
export class ConfirmacionCompraComponent implements OnInit {
  cartItems: any[] = [];
  totalCarrito: number = 0;
  metodoPago: string = 'tarjeta';
  comprobante: File | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const storedCart = localStorage.getItem('carrito');
    if (storedCart) {
      try {
        this.cartItems = JSON.parse(storedCart);
        console.log('Datos del carrito en confirmación:', this.cartItems); // Verificar datos en consola
      } catch (error) {
        console.error('Error al cargar el carrito desde localStorage:', error);
      }
    } else {
      console.warn('No se encontraron datos del carrito en localStorage.');
    }
    this.calcularTotal();
  }

  calcularTotal() {
    this.totalCarrito = this.cartItems.reduce((total, item) => {
      const precioTotal = isNaN(item.precioTotal) ? 0 : item.precioTotal;
      return total + precioTotal;
    }, 0);
    console.log('Total a pagar calculado en confirmación:', this.totalCarrito);
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.comprobante = event.target.files[0];
      console.log('Comprobante seleccionado:', this.comprobante);
    }
  }

  confirmarCompra() { if (!this.comprobante) { 
    console.error('Debe adjuntar un comprobante de pago para finalizar la compra.'); 
    return; } console.log('Compra confirmada:', this.cartItems); 
    console.log('Método de pago:', this.metodoPago); 
    if (this.comprobante) { 
      console.log('Comprobante adjunto:', this.comprobante.name); 
    } 
    localStorage.removeItem('cart'); // Limpiar el carrito del localStorage 
    this.router.navigate(['/confirmacion-exitosa']); 
  }
}
