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
export class HomeComponent implements OnInit { // Implementa OnInit para inicialización
  title: string; // Mejor uso de tipo que "any"
  

//eventos = [.....eventossss]

  constructor(
    public auth: AuthService,
    public db: DatabaseService
  ) {
    this.title = "Home";
  }

  ngOnInit() { // Uso de OnInit para lógica de inicialización
    this.db.fetchFirestoreCollection('pruebis').subscribe(collection => {
      console.log(collection); // Imprime la colección obtenida
    }, error => {
      console.error('Error fetching collection:', error);
    });

  //  this.eventos.forEach(element => {
    //  this.db.addFirestoreDocument('eventos, elemeent')
   // });
  }
}
