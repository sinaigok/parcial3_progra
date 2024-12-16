import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-crear-review',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-review.component.html',
  styleUrls: ['./crear-review.component.scss']
})
export class CrearReviewComponent implements OnInit {
  reviewForm!: FormGroup;
  eventId!: string;
  eventName: string = '';
  profile: any;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private db: DatabaseService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id') ?? '';
    this.getEventDetail(this.eventId);
    this.createForm();
    this.profile = this.auth.profile;
  }

  getEventDetail(eventId: string) {
    this.db.getDocumentById('eventos', eventId).subscribe(
      (evento: any) => {
        this.eventName = evento.name; // Asumir que el campo del nombre es 'name'
      },
      (error: any) => {
        console.error('Error al obtener el detalle del evento', error);
      }
    );
  }

  createForm() {
    this.reviewForm = this.fb.group({
      reviewText: ['', Validators.required],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  async submitReview() {
    if (this.reviewForm.invalid) {
      return;
    }

    const user = this.auth.getCurrentUser();
    if (user) {
      const review = {
        username: this.profile.name,
        eventId: this.eventId,
        eventName: this.eventName, // Guardar también el nombre del evento
        text: this.reviewForm.value.reviewText,
        rating: this.reviewForm.value.rating,
        date: new Date().toISOString()
      };
      await this.db.addReview(review);
      console.log('Reseña guardada');
      alert("Reseña subida");
      this.router.navigate(['/historial-compras']);
    }
  }
}
