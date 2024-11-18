import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title: string = "LogIn";
  
  users = [
    {
      id: "1",
      name: "Juan Perez",
      username: "juanp",
      email: "juanp@example.com",
      password: "password123"
    },
    {
      id: "2",
      name: "Maria Gomez",
      username: "mariag",
      email: "mariag@example.com",
      password: "password456"
    },
    {
      id: "3",
      name: "Carlos Lopez",
      username: "carlosl",
      email: "carlosl@example.com",
      password: "password789"
    },
    {
      id: "4",
      name: "Ana Martinez",
      username: "anam",
      email: "anam@example.com",
      password: "password101"
    },
    {
      id: "5",
      name: "Pedro Sanchez",
      username: "pedros",
      email: "pedros@example.com",
      password: "password102"
    },
    {
      id: "6",
      name: "Luisa Fernandez",
      username: "luisaf",
      email: "luisaf@example.com",
      password: "password103"
    },
    {
      id: "7",
      name: "Andres Ramirez",
      username: "andresr",
      email: "andresr@example.com",
      password: "password104"
    },
    {
      id: "8",
      name: "Claudia Torres",
      username: "claudiat",
      email: "claudiat@example.com",
      password: "password105"
    },
    {
      id: "9",
      name: "Miguel Rodriguez",
      username: "miguelr",
      email: "miguelr@example.com",
      password: "password106"
    },
    {
      id: "10",
      name: "Laura Diaz",
      username: "laurad",
      email: "laurad@example.com",
      password: "password107"
    }
  ];

  constructor(public auth: AuthService, private db: DatabaseService) {
    auth.islogued = true;
  }

  ngOnInit(): void {
    this.users.forEach(user => {
      this.db.addFirestoreDocument('users', user).then(() => {
        console.log('Usuario agregado exitosamente:', user);
      }).catch(error => {
        console.error('Error al agregar usuario:', error);
      });
    });
  }
}
