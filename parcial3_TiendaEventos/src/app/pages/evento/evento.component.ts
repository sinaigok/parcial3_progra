import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa los módulos que necesitas
import { DatabaseService } from '../../services/database.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-evento',
  standalone: true, // Añadir standalone: true
  imports: [CommonModule, RouterModule], // Asegúrate de incluir los módulos necesarios
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {
  eventId: string | null = null;
  evento: any;

  constructor(
    private route: ActivatedRoute,
    private db: DatabaseService
  ) {}

  ngOnInit() {
    // Obtén el ID del evento desde la URL
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.getEventDetail(this.eventId);
    }
  }

  getEventDetail(eventId: string) {
    this.db.getDocumentById('eventos', eventId).subscribe(
      (evento: any) => {
        this.evento = evento;
      },
      (error: any) => {
        console.error('Error al obtener el detalle del evento', error);
      }
    );
  }
}
