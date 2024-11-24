import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: any;

  constructor(
    public auth: AuthService,
    public db: DatabaseService,
    private router: Router // Inyecta el Router
  ) {}

  ngOnInit() {
    if (!this.auth.verifyIsLogued()) {
      this.router.navigateByUrl('/login'); // Redirige al login si no está logueado
    } else {
      this.profile = this.auth.profile;
    }
  }

  logout() {
    this.auth.logoutUser().then(() => {
      localStorage.clear(); // Borra todos los datos del local storage
      this.router.navigateByUrl('/login'); // Redirige al login después de cerrar sesión
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
