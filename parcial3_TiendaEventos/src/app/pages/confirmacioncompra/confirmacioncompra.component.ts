import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
//import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-confirmacion-compra',
  standalone: true,
  imports: [CommonModule], // Asegúrate de que CommonModule esté importado
  templateUrl: './confirmacioncompra.component.html',
  styleUrls: ['./confirmacioncompra.component.scss']
})
export class ConfirmacionCompraComponent implements OnInit {
  cartItems: any[] = [];
  totalCarrito: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    console.log('Datos del carrito:', this.cartItems); // Verificar que los datos sean correctos
    this.calcularTotal();
  }
  

  calcularTotal() {
    this.totalCarrito = this.cartItems.reduce((total, item) => {
      const precioTotal = isNaN(item.precioTotal) ? 0 : item.precioTotal;
      return total + precioTotal;
    }, 0);
    console.log('Total a pagar calculado:', this.totalCarrito);
  }

  confirmarCompra() {
    console.log('Compra confirmada:', this.cartItems);
    this.cartService.clearCart();
    this.router.navigate(['/confirmacion-exitosa']);
  }
}
