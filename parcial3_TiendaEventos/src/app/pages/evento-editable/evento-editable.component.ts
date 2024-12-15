import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-evento-editable',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './evento-editable.component.html',
  styleUrls: ['./evento-editable.component.scss']
})
export class EventoEditableComponent implements OnInit {
  eventedit: string | null = null;
  originalEvento: any = {}; // Guardar una copia del evento original
  evento: any = {
    name: '',
    date: '',
    location: '',
    price: 0,
    ticketsAvailable: 0,
    destacado: false,
    descuento: { valorDescuento: 0 }
  };

  eventodelete: any = []; // Declaración de eventodelete

  // Estados de edición para cada campo
  editingName = false;
  editingDate = false;
  editingLocation = false;
  editingPrice = false;
  editingTickets = false;

  constructor(
    private route: ActivatedRoute,
    private db: DatabaseService,
    public auth: AuthService,
    private router: Router 
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
        this.evento = {
          ...evento,
          addedToCart: false,
          descuento: evento.descuento ?? { valorDescuento: 0 }
        };
        this.originalEvento = { ...this.evento }; // Guardar una copia del evento original
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

  // Función para verificar si hay cambios en el formulario
  isAnyFieldEditing(): boolean {
    return JSON.stringify(this.evento) !== JSON.stringify(this.originalEvento);
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
          this.originalEvento = { ...this.evento }; // Actualizar la copia del evento original
        },
        (error) => {
          console.error('Error al actualizar el evento', error);
        }
      );
    }
  }

  handleDelete() {
    if (this.eventedit) {
      this.db.deleteFirestoreDocument('eventos', this.eventedit).then(
        () => {
          console.log('Evento eliminado correctamente.');
          this.router.navigate(['/admin']); // Redirigir a /admin después de eliminar
        },
        (error) => {
          console.error('Error al eliminar el evento:', error);
        }
      );
    }
  }
}
