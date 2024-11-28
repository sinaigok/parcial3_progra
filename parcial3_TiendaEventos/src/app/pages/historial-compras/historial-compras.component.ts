import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-historial-compras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.scss']
})
export class HistorialComprasComponent implements OnInit {
  compras: any[] = [];

  constructor(
    private db: DatabaseService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const user = this.auth.getCurrentUser();
    if (user) {
      this.db.getCompras(user.uid).subscribe(compras => {
        this.compras = compras;
        console.log('Historial de compras:', this.compras);
      });
    }
  }
}
