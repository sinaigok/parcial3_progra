import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule], // Agregar ReactiveFormsModule aquí
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
  eventosearch: string = '';
  destacado : boolean=false;
  descuento: number=0;
  searchform: FormGroup;

  constructor(
    public auth: AuthService,
    public db: DatabaseService,
    private fb: FormBuilder,
  ) {
    this.searchform = this.fb.group({
      eventosearch: ['', Validators.required],
      destacado: [false],
      descuento: [false]
    });
    
  }

ngOnInit() {
  // Obtener y mostrar eventos de Firestore
  this.db.fetchFirestoreCollection('eventos').subscribe(
    (collection: any[]) => {
      this.eventos = collection ?? [];
      this.filteredEventos = collection ?? [];
      this.extractCategories();
      this.extractLocations();

      // Suscribirse a los cambios en el término de búsqueda
      this.searchform.get('eventosearch')!.valueChanges.subscribe(searchTerm => {
        this.applyFilters();
      });

      // Suscribirse a los cambios en los filtros de destacado y descuento
      this.searchform.get('destacado')!.valueChanges.subscribe(() => {
        this.applyFilters();
      });

      this.searchform.get('descuento')!.valueChanges.subscribe(() => {
        this.applyFilters();
      });
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
      .filter(evento => this.selectedDate === '' || new Date(evento.date).toDateString() === new Date(this.selectedDate).toDateString())
      .filter(evento => !this.searchform.get('destacado')!.value || evento.destacado) // Filtro para eventos destacados
      .filter(evento => !this.searchform.get('descuento')!.value || (evento.descuento && evento.descuento.valorDescuento > 0)); // Filtro para eventos con descuentos mayores a 0
    console.log('Eventos filtrados:', this.filteredEventos);
  }
  

  openSidebar() {
    document.getElementById('sidebar')!.style.width = '360px'; // Ajustar el ancho a 330px
  }

  closeSidebar() {
    document.getElementById('sidebar')!.style.width = '0';
  }
}
