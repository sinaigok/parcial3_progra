import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-gift-card',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './gift-card.component.html',
  styleUrl: './gift-card.component.scss'
})
export class GiftCardComponent implements OnInit {
  tittle: string = "GiftCards";
  giftcards: any[] = [];

  constructor (
    public db: DatabaseService,
    private fb: FormBuilder,
    public auth: AuthService,
  ) {}

  ngOnInit() {
    this.db.fetchFirestoreCollection('giftcard').subscribe(
      (collection: any[]) => {
        this.giftcards = collection ?? [];
        this.sortGiftcards();

        console.log('Giftcards:', this.giftcards);
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

  async newregalo (tarjetaregalo: any[]) {
    try {
      for (const regalo of tarjetaregalo) {
        await this.db.addFirestoreDocument('giftcard', regalo);
      }
      console.log('Giftcards agregados con éxito');
    } catch (error) {
      console.error('Error al agregar giftcards:', error);
    }
  }

}
