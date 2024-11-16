import { Component } from '@angular/core';
import { CardComponent } from '../../componentes/card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title: any;
  constructor(){
    this.title = "Home"
  }
}
