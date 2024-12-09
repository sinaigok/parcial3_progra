import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  title: string = "Administración";
  eventos: any[] = [];

  constructor(
    // public auth: AuthService,
    public db: DatabaseService,
    // public firestore: Firestore
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
}
