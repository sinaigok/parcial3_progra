import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { Firestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-giftcard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-giftcard.component.html',
  styleUrl: './new-giftcard.component.scss'
})
export class NewGiftcardComponent implements OnInit {
  giftcards: any [] = [];
  newGiftcard: any = {
    id: '',
    codigo: '',
    monto: '',
    estado: false
  };

  constructor (
    public auth: AuthService,
    public db: DatabaseService,
    public firestore: Firestore
  ) {}

  ngOnInit() {
    this.db.fetchFirestoreCollection('giftcard').subscribe(
      (collection: any[]) => {
        this.giftcards = collection ?? [];
        this.sortGiftcards();
      },
      error => {
        console.error('Error al obtener la colección:', error);
      }
    );
  }

  sortGiftcards() {
    this.giftcards.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  async onSubmit() {
    try {
      await this.db.addFirestoreDocument('giftcard', this.newGiftcard);
      this.giftcards.push({ ...this.newGiftcard });
      this.newGiftcard = {
        id: '',
        codigo: '',
        monto: '',
        estado: false
      };
      console.log('GiftCard agregada exitosamente');
    } catch (error) {
      console.error('Error al agregar giftcard', error);
    }
  }

}
