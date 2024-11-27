import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-confirmacion-compra',
  templateUrl: './confirmacioncompra.component.html',
  styleUrls: ['./confirmacioncompra.component.scss']
})
export class ConfirmacionCompraComponent implements OnInit {
  cartItems: any[] = [];
  totalCarrito: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.calcularTotal();
  }

  calcularTotal() {
    this.totalCarrito = this.cartItems.reduce((total, item) => total + item.precioTotal, 0);
  }

  confirmarCompra() {
    console.log('Compra confirmada:', this.cartItems);
    this.cartService.clearCart();
    this.router.navigate(['/confirmacion-exitosa']);
  }
}
