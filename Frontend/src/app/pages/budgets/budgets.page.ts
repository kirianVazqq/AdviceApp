import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BudgetService } from 'src/app/services/budget.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
})
export class BudgetsPage implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private budgetService: BudgetService,
    private storage: Storage
  ) {
    this.init();
  }
  budgets: any[] = [];
  async init() {
    await this.storage.create();
  }

  ngOnInit() {
    this.getBudget();
  }
  async getBudget() {
    const token = await this.storage.get('token');
    if (token === null) {
      console.error('Token no encontrado');
      return;
    }
    this.budgetService.getBudgets(token).subscribe(
      (data: any) => {
        this.budgets = data;
      },
      (error) => {
        console.error('Error al obtener los presupuestos', error);
      }
    );
  }
}
