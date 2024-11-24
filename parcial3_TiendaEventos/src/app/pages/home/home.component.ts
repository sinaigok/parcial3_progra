import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

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
  locations: string[] = [];
  selectedCategory: string = '';
  selectedLocation: string = '';
  selectedDate: string = '';

  constructor(
    public auth: AuthService,
    public db: DatabaseService
  ) {}

  ngOnInit() {
    this.db.fetchFirestoreCollection('eventos').subscribe(
      (collection: any[]) => {
        this.eventos = collection ?? [];
        this.filteredEventos = collection ?? [];
        this.extractCategories();
        this.extractLocations();
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

  extractLocations() {
    this.locations = Array.from(new Set(this.eventos.map(evento => evento?.location)));
  }

  filterByCategory(event: Event) {
    this.selectedCategory = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  filterByLocation(event: Event) {
    this.selectedLocation = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  filterByDate(event: Event) {
    this.selectedDate = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredEventos = this.eventos
      .filter(evento => this.selectedCategory === '' || evento.category === this.selectedCategory)
      .filter(evento => this.selectedLocation === '' || evento.location === this.selectedLocation)
      .filter(evento => this.selectedDate === '' || new Date(evento.date).toDateString() === new Date(this.selectedDate).toDateString());
  }
}
