import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BudgetService } from 'src/app/services/budget.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
})
export class BudgetsPage implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private budgetService: BudgetService
  ) {}
  budgets: any[] = [];
  ngOnInit() {
    this.getBudget();
  }
  getBudget() {
    const token = localStorage.getItem('token');
    if (token === null) {
      console.error('Token no encontrado');
      return;
    }
    this.budgetService.getBudgets(token).subscribe(
      (data: any) => {
        this.budgets = data;
      },
      (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    );
  }
}
