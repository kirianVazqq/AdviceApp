import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetService } from 'src/app/services/budget.service';
import { Storage } from '@ionic/storage-angular';
import { jwtDecode } from 'jwt-decode';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
})
export class BudgetsPage implements OnInit {
  searchedBudgets:string ;
  budgets: any[] = [];
  flag: boolean = true;
  budgetToDelete: any;
  deleteAlertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Eliminación cancelada');
      },
    },
    {
      text: 'Eliminar',
      handler: () => {
        this.deleteBudget(this.budgetToDelete.id);
      },
    },
  ];
  constructor(
    private router: Router,
    private budgetService: BudgetService,
    private storage: Storage,
    private alertController: AlertController
  ) {
    this.init();
    this.searchedBudgets = '';
  }
  
  async init() {
    await this.storage.create();
  }

  ngOnInit() {
    this.getBudgetByUser();
  
  }
  async presentDeleteAlert(budget: any) {
    this.budgetToDelete = budget;
    const alert = await this.alertController.create({
      id: 'confirm-delete-alert',
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar este presupuesto?',
      buttons: this.deleteAlertButtons,
    });

    await alert.present();
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

  async getBudgetByUser() {
    const token = await this.storage.get('token');
    if (token === null) {
      console.error('Token no encontrado');
      return;
    }

    const decoded = jwtDecode(token) as any; // Aquí estás diciendo que decoded puede ser de cualquier tipo
    const userId = decoded.id; // TypeScript ya no se quejará porque usamos 'any'
    this.budgetService.getBudgetsByUser(token, userId).subscribe(
      (data: any) => {
        this.budgets = data;
        console.log(this.budgets);
      },
      (error) => {
        console.error('Error al obtener los presupuestos', error);
      }
    );
  }

  addInForm(budget: any) {
    const navigationExtras = {
      state: {
        flag: this.flag,
        budget: budget,
      },
    };
    this.router.navigate(['/form-budget'], navigationExtras);
  }

  async deleteBudget(budgetId: number) {
    const token = await this.storage.get('token');
    if (token) {
      this.budgetService.deleteBudget(budgetId, token).subscribe(
        (response) => {
          console.log('Presupuesto eliminado');
          this.getBudgetByUser();
        },
        (error) => {
          console.error('Error al eliminar el usuario', error);
        }
      );
    } else {
      console.error('Token no encontrado');
    }
  }
  goToBudgetsForm() {
    this.router.navigate(['/form-budget']);
  }
  searchBudgets() {

    if (this.searchedBudgets.trim() === '') return this.budgets;  
    return this.budgets.filter((budget: any) => {
      return budget.name.toLowerCase().includes(this.searchedBudgets.toLowerCase()) || budget.model.toLowerCase().includes(this.searchedBudgets.toLowerCase()) ;
      console.log(budget.name)
    });

  }
}
