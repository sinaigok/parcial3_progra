import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { CartService } from '../../services/cart.service'; // Asegúrate de tener un servicio de carrito
import { CardComponent } from '../../componentes/card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title: string = "Home";
  eventos: any[] = [];

  constructor(
    public auth: AuthService,
    public db: DatabaseService,
    private cartService: CartService // Inyecta el servicio del carrito
  ) {}

  ngOnInit() {
    this.db.fetchFirestoreCollection('eventos').subscribe(
      (collection: any[]) => {
        this.eventos = collection;
        console.log(collection); // Imprime la colección obtenida
      },
      (error) => {
        console.error('Error al obtener la colección:', error);
      }
    );
  }

  addToCart(evento: any) {
    this.cartService.addToCart(evento);
    console.log('Evento añadido al carrito:', evento);
  }
}
