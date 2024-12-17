import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';

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
  studentEmail: string = '';
  discountPercentage: number = 10; // Ejemplo de descuento del 10%
  discountApplied: boolean = false;
  totalWithDiscount: number = 0;
  validDomains: string[] = ['.edu', '.edu.bo']; // Lista de dominios válidos

  constructor(
    private router: Router,
    private db: DatabaseService,
    private auth: AuthService
  ) {}

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
    this.totalWithDiscount = this.totalCarrito;
    console.log('Total a pagar calculado en confirmación:', this.totalCarrito);
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.comprobante = event.target.files[0];
      console.log('Comprobante seleccionado:', this.comprobante);
    }
  }

  applyStudentDiscount() {
    if (this.isUniversityEmail(this.studentEmail)) {
      this.discountApplied = true;
      this.totalWithDiscount = this.totalCarrito * (1 - this.discountPercentage / 100);
      console.log(`Descuento aplicado. Nuevo total: ${this.totalWithDiscount} Bs`);
    } else {
      alert('Por favor, introduce un correo universitario válido.');
    }
  }

  isUniversityEmail(email: string): boolean {
    return this.validDomains.some(domain => email.endsWith(domain));
  }

  async confirmarCompra() {
    if (!this.comprobante) {
      console.error('Debe adjuntar un comprobante de pago para finalizar la compra.');
      return;
    }
  
    const user = this.auth.getCurrentUser();
    if (user) {
      const compra = {
        items: this.cartItems.map(item => ({
          nombre: item.nombre,
          lugar: item.lugar,
          fecha: item.fecha,
          cantidadEntradas: item.cantidadEntradas,
          precio: item.precio,
          precioTotal: item.precioTotal,
          descuento: item.descuento ?? { valorDescuento: 0 }  // Asegurarse de incluir el descuento
        })),
        total: this.totalWithDiscount, // Usar el total con descuento si se aplicó
        metodoPago: this.metodoPago,
        fecha: new Date().toISOString(),
        comprobante: this.comprobante.name
      };
      
      await this.db.guardarCompra(user.uid, compra);
      console.log('Compra guardada en la base de datos');
      
      localStorage.removeItem('carrito'); // Limpiar el carrito del localStorage
      this.router.navigate(['/confirmacion-exitosa']);
    }
  }
}
