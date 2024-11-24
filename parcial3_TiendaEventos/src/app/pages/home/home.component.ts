import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs'; // Asegúrate de importar Observable
import { collectionData } from '@angular/fire/firestore'; // Importa esto si no lo has hecho ya

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title: string = "Home";
  eventos: any[] = [];
  filteredEventos: any[] = [];
  categories: string[] = [];

  constructor(
    public auth: AuthService,
    public db: DatabaseService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // Verifica que el método fetchFirestoreCollection devuelve un Observable
    this.db.fetchFirestoreCollection('eventos').subscribe(
      (collection: any[]) => {
        this.eventos = collection ?? [];
        this.filteredEventos = collection ?? [];
        this.extractCategories();
        console.log(collection); // Imprime la colección obtenida
      },
      (error) => {
        console.error('Error al obtener la colección:', error);
      }
    );
  }

  extractCategories() {
    this.categories = Array.from(new Set(this.eventos.map(evento => evento?.category)));
  }

  filterByCategory(event: Event) {
    const category = (event.target as HTMLSelectElement).value;
    if (category === "") {
      this.filteredEventos = this.eventos;
    } else {
      this.filteredEventos = this.eventos.filter(evento => evento?.category === category);
    }
  }

  addToCart(evento: any) {
    if (this.auth.isLogued) {
      this.cartService.addToCart(evento);
      console.log('Evento añadido al carrito:', evento);
    } else {
      alert('Para poner cosas en el carrito debes iniciar sesión');
    }
  }
}
