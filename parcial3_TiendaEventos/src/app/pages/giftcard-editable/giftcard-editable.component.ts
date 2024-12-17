import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-giftcard-editable',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './giftcard-editable.component.html',
  styleUrls: ['./giftcard-editable.component.scss']
})

export class GiftcardEditableComponent implements OnInit {
  giftcardedit: string | null = null;
  originalGiftcard: any = {};
  giftcard: any = {
    codigo: '',
    monto: '',
    estado: false
  };

  giftcarddelete: any = [];

  constructor(
    private route: ActivatedRoute,
    private db: DatabaseService,
    public auth: AuthService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.giftcardedit = this.route.snapshot.paramMap.get('id');
    if (this.giftcardedit) {
      this.getGiftcardDetail(this.giftcardedit);
    }
  }

  getGiftcardDetail(giftcardId: string) {
    this.db.getDocumentById('giftcard', giftcardId).subscribe(
      (giftcard: any) => {
        this.giftcard = giftcard;
        this.originalGiftcard = { ...giftcard }; // Guardar una copia de la giftcard original
      },
      (error: any) => {
        console.error('Error al obtener el detalle de la giftcard:', error);
      }
    );
  }

  saveGiftcard() {
    if (this.giftcardedit) {
      this.db.updateFirestoreDocument('giftcard', this.giftcardedit, this.giftcard).then(() => {
        localStorage.setItem(`giftcard-${this.giftcardedit}`, JSON.stringify(this.giftcard));
        alert('La giftcard ha sido actualizada exitosamente.');
        this.router.navigate(['/giftcards']);
      }).catch(error => {
        console.error('Error al actualizar la giftcard:', error);
      });
    }
  }

  resetChanges() {
    this.giftcard = { ...this.originalGiftcard };
  }

  handleDelete(){
    if (this.giftcardedit){
      this.db.deleteFirestoreDocument('giftcard', this.giftcardedit).then(
        () => {
          console.log('Gift-Card eliminado correctamente.');
          this.router.navigate(['/gift-card']);
        },
        (error) => {
          console.error('Error al eliminar el Gift-Card:', error);
        }
      )
    }
  }

}
