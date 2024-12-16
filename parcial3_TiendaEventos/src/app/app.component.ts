import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './pages/footer/footer.component'; // Importar FooterComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent], // Añadir FooterComponent a los imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Parcial3TiendaEventos';
  profileLink: string = '';

  constructor() {
    this.profileLink = ''; 
    this.getProfileLink();
  }

  ngOnInit() {
    this.getProfileLink();
  }

  getProfileLink() {
    const isAdmin = JSON.parse(localStorage.getItem('admin') ?? 'false'); // Manejar 'null'
    if (isAdmin) {
      this.profileLink = '/profile-admin';
    } else {
      this.profileLink = '/profile';
    }
  }
}
