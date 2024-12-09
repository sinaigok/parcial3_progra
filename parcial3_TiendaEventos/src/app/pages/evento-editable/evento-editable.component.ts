import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-evento-editable',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './evento-editable.component.html',
  styleUrls: ['./evento-editable.component.scss']
})
export class EventoEditableComponent implements OnInit {
  eventedit: string | null = null;
  evento: any = {
    name: '',
    date: '',
    location: '',
    price: 0,
    ticketsAvailable: 0
  };

  // Estados de edición para cada campo
  editingName = false;
  editingDate = false;
  editingLocation = false;
  editingPrice = false;
  editingTickets = false;

  constructor(
    private route: ActivatedRoute,
    private db: DatabaseService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.eventedit = this.route.snapshot.paramMap.get('id');
    if (this.eventedit) {
      this.getEventDetail(this.eventedit);
    }
  }

  getEventDetail(eventId: string) {
    this.db.getDocumentById('eventos', eventId).subscribe(
      (evento: any) => {
        this.evento = { ...evento, addedToCart: false };
      },
      (error: any) => {
        console.error('Error al obtener el detalle del evento', error);
      }
    );
  }

  toggleEdit(field: string) {
    switch (field) {
      case 'name':
        this.editingName = !this.editingName;
        break;
      case 'date':
        this.editingDate = !this.editingDate;
        break;
      case 'location':
        this.editingLocation = !this.editingLocation;
        break;
      case 'price':
        this.editingPrice = !this.editingPrice;
        break;
      case 'tickets':
        this.editingTickets = !this.editingTickets;
        break;
    }
  }

  isAnyFieldEditing(): boolean {
    return this.editingName || this.editingDate || this.editingLocation || this.editingPrice || this.editingTickets;
  }

  onSubmit() {
    if (this.eventedit) {
      this.db.updateFirestoreDocument('eventos', this.eventedit, this.evento).then(
        () => {
          console.log('Evento actualizado correctamente.');
          // Reinicia los estados de edición
          this.editingName = false;
          this.editingDate = false;
          this.editingLocation = false;
          this.editingPrice = false;
          this.editingTickets = false;
        },
        (error) => {
          console.error('Error al actualizar el evento', error);
        }
      );
    }
  }
}
