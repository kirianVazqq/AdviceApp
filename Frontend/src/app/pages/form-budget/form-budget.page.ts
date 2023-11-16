import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from 'src/app/services/budget.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-form-budget',
  templateUrl: './form-budget.page.html',
  styleUrls: ['./form-budget.page.scss'],
})
export class FormBudgetPage implements OnInit {
  formBudget!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private budgetService: BudgetService,
    private storage: Storage
  ) {}

   ngOnInit() {
     this.storage.create();
    this.formBudget = this.formBuilder.group({
      userId: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      typeBudget: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      tuition: ['', Validators.required],
      kilometers: ['', [Validators.required, Validators.min(0)]],
      horsepower: ['', [Validators.required, Validators.min(0)]],
      typeVehicle: ['', Validators.required],
      insuranceName: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }
  async addBudget() {
    if (this.formBudget.invalid) {
      console.error('El formulario no es válido');
      return;
    }
    let budget = this.formBudget.value;
    const token = await this.storage.get('token');
    if (token === null) {
      console.error('Token no encontrado');
      return;
    }

    this.budgetService.addBudget(budget, token).subscribe(
      (res) => {
        console.log('Presupuesto creado', res);
        this.formBudget.reset();
      },
      (error) => {
        console.error('Error al crear el presupuesto', error);
      }
    );
  }
}
