import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'] // Corrected 'styleUrl' to 'styleUrls'
})
export class AdminComponent implements OnInit {
  title: string = "Administración";
  eventos: any[] = [];
  filteredEventos: any[] = [];
  categories: string[] = [];
  locations: string[] = [];
  selectedCategory: string = '';
  selectedLocation: string = '';
  selectedDate: string = '';
  eventosearch: string = '';
  searchform: FormGroup;

  constructor(
    public db: DatabaseService,
    private fb: FormBuilder,
    public auth: AuthService,
  ) {
    this.searchform = this.fb.group({
      eventosearch: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.db.fetchFirestoreCollection('eventos').subscribe(
      (collection: any[]) => {
        this.eventos = collection ?? [];
        this.filteredEventos = collection ?? [];
        this.extractCategories();
        this.extractLocations();
        this.sortEventos();

        this.searchform.get('eventosearch')!.valueChanges.subscribe(searchTerm => {
          this.filteredEventos = this.eventos.filter(evento =>
            evento.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });

        console.log('Eventos:', this.eventos);
      },
      error => {
        console.error('Error al obtener la colección:', error);
      }
    );
  }

  sortEventos() {
    this.eventos.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  async newevent(events: any[]) {
    try {
      for (const event of events) {
        await this.db.addFirestoreDocument('eventos', event);
      }
      console.log('Eventos agregados con éxito');
    } catch (error) {
      console.error('Error al agregar eventos:', error);
    }
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
}
