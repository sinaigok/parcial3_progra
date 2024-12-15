import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { Firestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-event',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  eventos: any[] = [];
  newEvent: any = {
    id: '',
    name: '',
    date: '',
    artists: [],
    ticketsAvailable: 0,
    totalTickets: 0,
    location: '',
    category: '',
    musicGenre: '',
    price: 0,
    imageUrl: '',
    destacado: false, // Nuevo campo
    descuento: { valorDescuento: 0 } // Nuevo campo
  }; // Define newEvent para el formulario

  constructor(
    public auth: AuthService,
    public db: DatabaseService,
    public firestore: Firestore
  ) {}

  ngOnInit() {
    this.db.fetchFirestoreCollection('eventos').subscribe(
      (collection: any[]) => {
        this.eventos = collection ?? [];
        this.sortEventos();
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

  async onSubmit() {
    try {
      await this.db.addFirestoreDocument('eventos', this.newEvent);
      this.eventos.push({ ...this.newEvent }); // Añade el nuevo evento a la lista
      this.newEvent = {
        id: '',
        name: '',
        date: '',
        artists: [],
        ticketsAvailable: 0,
        totalTickets: 0,
        location: '',
        category: '',
        musicGenre: '',
        price: 0,
        imageUrl: '',
        destacado: false,
        descuento: { valorDescuento: 0 }
      }; // Reinicia el formulario
      console.log('Evento agregado con éxito');
    } catch (error) {
      console.error('Error al agregar evento:', error);
    }
  }
}
