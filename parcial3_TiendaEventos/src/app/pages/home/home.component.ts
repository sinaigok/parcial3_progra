import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { RouterModule } from '@angular/router';

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
    // Obtener y mostrar eventos de Firestore
    this.db.fetchFirestoreCollection('eventos').subscribe(
      (collection: any[]) => {
        this.eventos = collection ?? [];
        this.filteredEventos = collection ?? [];
        this.extractCategories();
        this.extractLocations();
        console.log('Eventos:', this.eventos);
      },
      (error) => {
        console.error('Error al obtener la colección:', error);
      }
    );
  }

  

  extractCategories() {
    this.categories = Array.from(new Set(this.eventos.map(evento => evento?.category)));
    console.log('Categorías extraídas:', this.categories);
  }

  extractLocations() {
    this.locations = Array.from(new Set(this.eventos.map(evento => evento?.location)));
    console.log('Ubicaciones extraídas:', this.locations);
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
    console.log('Aplicando filtros en home...');
    this.filteredEventos = this.eventos
      .filter(evento => this.selectedCategory === '' || evento.category === this.selectedCategory)
      .filter(evento => this.selectedLocation === '' || evento.location === this.selectedLocation)
      .filter(evento => this.selectedDate === '' || new Date(evento.date).toDateString() === new Date(this.selectedDate).toDateString());
    console.log('Eventos filtrados:', this.filteredEventos);
  }

  openSidebar() {
    document.getElementById('sidebar')!.style.width = '360px'; // Ajustar el ancho a 330px
  }

  closeSidebar() {
    document.getElementById('sidebar')!.style.width = '0';
  }
}
