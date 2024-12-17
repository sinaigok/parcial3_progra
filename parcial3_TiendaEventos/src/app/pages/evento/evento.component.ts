import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { RouterModule } from '@angular/router';
import { RecomendacionesComponent } from '../recomendaciones/recomendaciones.component';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ReiewsComponent } from '../reiews/reiews.component';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RecomendacionesComponent, ReiewsComponent],
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {
  eventId: string | null = null;
  evento: any;
  cantidadEntradas: number = 0;
  botonActivo: boolean = false;
  favoritos: any[] = [];
  rating: number = 0; // Valoración actual
  hoverRating: number = 0; // Valoración en hover

  constructor(
    private route: ActivatedRoute,
    private db: DatabaseService,
    private cartService: CartService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    this.rating = parseInt(localStorage.getItem(`rating-${this.eventId}`) || '0'); // Cargar la valoración del Local Storage
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

  rateEvent(star: number) {
    this.rating = star;
    localStorage.setItem(`rating-${this.eventId}`, star.toString()); // Guardar la valoración en el Local Storage
    console.log(`Evento valorado con ${star} estrellas`);
  }

  hoverStars(star: number) {
    this.hoverRating = star;
  }

  resetStars() {
    this.hoverRating = 0;
  }

  toggleFavorite(evento: any) {
    const index = this.favoritos.findIndex(fav => fav.id === evento.id);
    if (index > -1) {
      this.favoritos.splice(index, 1);
    } else {
      this.favoritos.push(evento);
    }
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }

  isFavorite(evento: any): boolean {
    return this.favoritos.some(fav => fav.id === evento.id);
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
      const precioConDescuento = evento.descuento && evento.descuento.valorDescuento > 0 
        ? evento.price - (evento.price * evento.descuento.valorDescuento / 100)
        : evento.price;
      const itemCarrito = {
        eventoId: evento.id,
        nombre: evento.name,
        lugar: evento.location, // Añadir lugar
        fecha: evento.date,     // Añadir fecha
        descuento: evento.descuento,
        cantidadEntradas: this.cantidadEntradas,
        precio: precioConDescuento,
        precioTotal: this.cantidadEntradas * precioConDescuento
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
