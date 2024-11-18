import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../componentes/card/card.component';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {
  title: string = "Home";
  eventos = [
    { id: "1", name: "Concierto de Rock", date: "2024-12-01T19:00:00", artists: ["Coldplay"], ticketsAvailable: 200, totalTickets: 500, location: "Estadio Nacional, La Paz", category: "Música", musicGenre: "Rock" },
    { id: "2", name: "Festival de Jazz", date: "2024-12-05T18:00:00", artists: ["Norah Jones"], ticketsAvailable: 150, totalTickets: 300, location: "Teatro Municipal, Cochabamba", category: "Música", musicGenre: "Jazz" },
    { id: "3", name: "Show de Comedia", date: "2024-12-10T20:00:00", artists: ["Kevin Hart"], ticketsAvailable: 100, totalTickets: 250, location: "Auditorio Central, Santa Cruz", category: "Comedia" },
    { id: "4", name: "Concierto Pop", date: "2024-12-15T21:00:00", artists: ["Justin Bieber"], ticketsAvailable: 300, totalTickets: 600, location: "Plaza Principal, Sucre", category: "Música", musicGenre: "Pop" },
    { id: "5", name: "Festival Latino", date: "2024-12-20T19:30:00", artists: ["Morat"], ticketsAvailable: 250, totalTickets: 500, location: "Parque Central, La Paz", category: "Música", musicGenre: "Latina" },
    { id: "6", name: "Concierto de Hip-Hop", date: "2024-12-25T20:00:00", artists: ["Duki"], ticketsAvailable: 180, totalTickets: 400, location: "Estadio Olímpico, Cochabamba", category: "Música", musicGenre: "Hip-Hop" },
    { id: "7", name: "Festival Electrónico", date: "2024-12-30T22:00:00", artists: ["David Guetta"], ticketsAvailable: 300, totalTickets: 700, location: "Club Nocturno, Santa Cruz", category: "Música", musicGenre: "Electrónica" },
    { id: "8", name: "Concierto de Baladas", date: "2025-01-05T19:00:00", artists: ["Luis Fonsi"], ticketsAvailable: 220, totalTickets: 500, location: "Teatro Nacional, Sucre", category: "Música", musicGenre: "Baladas" },
    { id: "9", name: "Festival de Música Indie", date: "2025-01-10T18:00:00", artists: ["The Strokes"], ticketsAvailable: 150, totalTickets: 300, location: "Campo Abierto, La Paz", category: "Música", musicGenre: "Indie" },
    { id: "10", name: "Show de Magia", date: "2025-01-15T20:00:00", artists: ["David Copperfield"], ticketsAvailable: 100, totalTickets: 250, location: "Centro de Convenciones, Cochabamba", category: "Magia" },
    { id: "11", name: "Concierto de Reguetón", date: "2025-01-20T21:00:00", artists: ["Bad Bunny"], ticketsAvailable: 300, totalTickets: 700, location: "Estadio Nacional, La Paz", category: "Música", musicGenre: "Reguetón" },
    { id: "12", name: "Festival de Música Clásica", date: "2025-01-25T19:30:00", artists: ["Yo-Yo Ma"], ticketsAvailable: 250, totalTickets: 500, location: "Teatro Municipal, Cochabamba", category: "Música", musicGenre: "Clásica" },
    { id: "13", name: "Concierto de Salsa", date: "2025-01-30T20:00:00", artists: ["Marc Anthony"], ticketsAvailable: 180, totalTickets: 400, location: "Auditorio Central, Santa Cruz", category: "Música", musicGenre: "Salsa" },
    { id: "14", name: "Festival de Música Alternativa", date: "2025-02-05T22:00:00", artists: ["Radiohead"], ticketsAvailable: 300, totalTickets: 600, location: "Parque Central, La Paz", category: "Música", musicGenre: "Alternativa" },
    { id: "15", name: "Concierto de Música Urbana", date: "2025-02-10T19:00:00", artists: ["Rosalía"], ticketsAvailable: 220, totalTickets: 500, location: "Plaza Principal, Sucre", category: "Música", musicGenre: "Urbana" },
    { id: "16", name: "Festival de Música Country", date: "2025-02-15T18:00:00", artists: ["Dolly Parton"], ticketsAvailable: 150, totalTickets: 300, location: "Campo Abierto, Cochabamba", category: "Música", musicGenre: "Country" },
    { id: "17", name: "Concierto de Rap", date: "2025-02-20T20:00:00", artists: ["Eminem"], ticketsAvailable: 100, totalTickets: 250, location: "Estadio Olímpico, Santa Cruz", category: "Música", musicGenre: "Rap" },
    { id: "18", name: "Show de Danza", date: "2025-02-25T21:00:00", artists: ["Riverdance"], ticketsAvailable: 300, totalTickets: 600, location: "Teatro Nacional, La Paz", category: "Danza" },
    { id: "19", name: "Festival de Música Electrónica", date: "2025-03-01T19:30:00", artists: ["Armin van Buuren"], ticketsAvailable: 250, totalTickets: 500, location: "Club Nocturno, Cochabamba", category: "Música", musicGenre: "Electrónica" },
    { id: "20", name: "Concierto de Pop", date: "2025-03-05T20:00:00", artists: ["Shawn Mendes"], ticketsAvailable: 180, totalTickets: 400, location: "Plaza Principal, Sucre", category: "Música", musicGenre: "Pop" },
    { id: "21", name: "Partido de Fútbol", date: "2025-03-10T18:00:00", teams: ["The Strongest", "Bolívar"], ticketsAvailable: 1000, totalTickets: 2000, location: "Estadio Nacional, La Paz", category: "Deportes" }
  ];

  constructor(
    public auth: AuthService,
    public db: DatabaseService
  ) {}

  ngOnInit() {
    this.db.fetchFirestoreCollection('pruebis').subscribe(collection => {
      console.log(collection); // Imprime la colección obtenida
    }, error => {
      console.error('Error al obtener la colección:', error);
    });
    
    this.eventos.forEach(element => {
      this.db.addFirestoreDocument('eventos', element).then(() => {
        console.log('Documento agregado exitosamente:', element);
      }).catch(error => {
        console.error('Error al agregar documento:', error);
      });
    });
  }
}
