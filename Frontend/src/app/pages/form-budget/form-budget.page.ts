import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from 'src/app/services/budget.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form-budget',
  templateUrl: './form-budget.page.html',
  styleUrls: ['./form-budget.page.scss'],
})
export class FormBudgetPage implements OnInit {
  formBudget!: FormGroup;
  flag?: string;
  budget: any = [];
  editingForm: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private budgetService: BudgetService,
    private storage: Storage,
    private router: Router
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
    const state = this.router.getCurrentNavigation()?.extras.state;

    if (state && state['flag'] && state['budget']) {
      this.editingForm = state['flag'];
      this.budget = state['budget'];
      // Muestra los valores por consola


      this.addInForm();
    } else {
      console.log('Los valores no están presentes en el state');
    }
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
  async addInForm() {
    this.formBudget.patchValue({
      userId: this.budget.userId,
      name: this.budget.name,
      lastName: this.budget.lastName,
      typeBudget: this.budget.typeBudget,
      brand: this.budget.brand,
      model: this.budget.model,
      tuition:this.budget.tuition,
      kilometers: this.budget.kilometers,
      horsepower: this.budget.horsepower,
      typeVehicle: this.budget.typeVehicle,
      insuranceName: this.budget.insuranceName,
      price: this.budget.price,
    });
  }
  async editBudget() {
    if (!this.formBudget.valid) {
      console.error('El formulario no es válido');
      return;
    }
    const userId = this.budget.id; // Asegúrate de que editingId se ha definido y se ha establecido correctamente
    if (!userId) {
      console.error('No hay un ID de usuario para editar');
      return;
    }

    // Obtener el token de autenticación si es necesario para tu API
    const token = await this.storage.get('token');
    if (!token) {
      console.error('Token de autenticación no encontrado');
      return;
    }

    const formValue = this.formBudget.value;
    const budgetToUpdate = {
      username: formValue.username,
      userId: formValue.userId,
      name: formValue.name,
      lastName: formValue.lastName,
      typeBudget: formValue.typeBudget,
      brand: formValue.brand,
      model: formValue.model,
      tuition:formValue.tuition,
      kilometers: formValue.kilometers,
      horsepower: formValue.horsepower,
      typeVehicle: formValue.typeVehicle,
      insuranceName: formValue.insuranceName,
      price: formValue.price,
    };

    this.budgetService.editBudget(userId, budgetToUpdate, token).subscribe(
      (response) => {
        console.log('Usuario actualizado exitosamente', response);
      this.formBudget.reset();
      this.editingForm=false;
      },
      (error) => {
        console.error('Error al actualizar el usuario', error);
      }
    );
  }
}
