import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { RouterModule } from '@angular/router';
import { RecomendacionesComponent } from '../recomendaciones/recomendaciones.component';
import { CartService } from '../../services/cart.service'; // Importar CartService
import { AuthService } from '../../services/auth.service'; // Importar AuthService

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [CommonModule, RouterModule, RecomendacionesComponent],
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {
  eventId: string | null = null;
  evento: any;

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

  addToCart(evento: any) {
    if (this.auth.isLogued) {
      this.cartService.addToCart(evento);
      this.evento.addedToCart = true;
      console.log('Evento añadido al carrito:', evento);
    } else {
      alert('Para poner cosas en el carrito debes iniciar sesión');
    }
  }
}
