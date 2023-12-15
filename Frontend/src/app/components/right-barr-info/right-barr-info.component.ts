import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'src/app/services/budget.service';
import { Storage } from '@ionic/storage-angular';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-right-barr-info',
  templateUrl: './right-barr-info.component.html',
  styleUrls: ['./right-barr-info.component.scss'],
})
export class RightBarrInfoComponent implements OnInit {
  budgets: any[] = [];

  constructor(
    private budgetService: BudgetService, // Usa 'private' para hacerlo accesible en la clase
    private storage: Storage
  ) {}

  ngOnInit() {
    this.getBudgetByUser(); // Llama a getBudget en ngOnInit si quieres cargar los presupuestos al iniciar
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
        data.sort((a: any, b: any) => b.id - a.id);
        this.budgets = data.slice(0, 10);
      },
      (error) => {
        console.error('Error al obtener los presupuestos', error);
      }
    );
  }
} 
