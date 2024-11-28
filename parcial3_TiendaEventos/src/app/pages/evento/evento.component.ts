import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { RouterModule } from '@angular/router';
import { RecomendacionesComponent } from '../recomendaciones/recomendaciones.component';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RecomendacionesComponent],
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {
  eventId: string | null = null;
  evento: any;
  cantidadEntradas: number = 0;
  botonActivo: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private db: DatabaseService,
    private cartService: CartService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.getEventDetail(this.eventId);
    }
  }

  getEventDetail(eventId: string) {
    this.db.getDocumentById('eventos', eventId).subscribe(
      (evento: any) => {
        this.evento = { ...evento, addedToCart: false };
      },
      (error: any) => {
        console.error('Error al obtener el detalle del evento', error);
      }
    );
  }

  actualizarBoton() {
    this.cantidadEntradas = Math.max(0, this.cantidadEntradas);
    this.botonActivo = this.cantidadEntradas > 0 && this.cantidadEntradas <= this.evento.ticketsAvailable;
  }

  addToCart(evento: any) {
    if (this.auth.isLogued && this.botonActivo) {
      evento.addedToCart = true;
      evento.ticketsAvailable -= this.cantidadEntradas;

      const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
      const itemCarrito = {
        eventoId: evento.id,
        nombre: evento.name,
        lugar: evento.location, // Añadir lugar
        fecha: evento.date,     // Añadir fecha
        cantidadEntradas: this.cantidadEntradas,
        precio: evento.price,
        precioTotal: this.cantidadEntradas * evento.price
      };

      if (isNaN(itemCarrito.precio)) {
        console.error(`Precio inválido para ${itemCarrito.nombre}`);
      }

      carrito.push(itemCarrito);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      
      console.log(`Evento: ${evento.name}, Cantidad de entradas: ${this.cantidadEntradas}, Precio Total: ${itemCarrito.precioTotal} Bs`);
      
      this.cartService.addToCart(itemCarrito);
    } else if (!this.auth.isLogued) {
      alert('Para poner cosas en el carrito debes iniciar sesión');
    }
  }
}
