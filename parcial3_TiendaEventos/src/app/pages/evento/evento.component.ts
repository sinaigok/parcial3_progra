import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { DatabaseService } from '../../services/database.service';
import { RouterModule } from '@angular/router';
import { RecomendacionesComponent } from '../recomendaciones/recomendaciones.component';
import { CartService } from '../../services/cart.service'; // Importar CartService
import { AuthService } from '../../services/auth.service'; // Importar AuthService

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RecomendacionesComponent], // Incluir FormsModule
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {
  eventId: string | null = null;
  evento: any;
  cantidadEntradas: number = 0; // Iniciar en 0
  botonActivo: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private db: DatabaseService,
    private cartService: CartService, // Inyectar CartService
    public auth: AuthService // Inyectar AuthService
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
    this.cantidadEntradas = Math.max(0, this.cantidadEntradas); // Asegurarse de que no sea negativo
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
        cantidadEntradas: this.cantidadEntradas,
        precio: evento.price,  // Asegúrate de que este valor está correctamente definido y tomado del campo `price`
        precioTotal: this.cantidadEntradas * evento.price
      };
  
      if (isNaN(itemCarrito.precio)) {
        console.error(`Precio inválido para ${itemCarrito.nombre}`);
      }
  
      carrito.push(itemCarrito);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      
      console.log(`Evento: ${evento.name}, Cantidad de entradas: ${this.cantidadEntradas}, Precio Total: ${itemCarrito.precioTotal} Bs`);
      
      this.cartService.addToCart(evento);
    } else if (!this.auth.isLogued) {
      alert('Para poner cosas en el carrito debes iniciar sesión');
    }
  }
  
}
