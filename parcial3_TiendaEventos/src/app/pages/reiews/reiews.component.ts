import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reiews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reiews.component.html',
  styleUrls: ['./reiews.component.scss']
})
export class ReiewsComponent implements OnInit {
  @Input() eventId!: string;
  reviews$: Observable<any[]>;

  constructor(private db: DatabaseService) {
    this.reviews$ = new Observable<any[]>(); // Inicialización en el constructor
  }

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    if (this.eventId) {
      this.reviews$ = this.db.getDocumentsByField('reviews', 'eventId', this.eventId);
    }
  }
}
