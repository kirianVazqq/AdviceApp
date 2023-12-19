import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from 'src/app/services/budget.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AlertController } from '@ionic/angular';

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
    private router: Router,
    private alertController: AlertController 
  ) {}

  ngOnInit() {
    this.storage.create();
    this.formBudget = this.formBuilder.group({
      userId: [''],
      clientId: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      typeBudget: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      tuition: ['', [Validators.required, Validators.pattern(/^\d{4}[A-Z]{3}$/i)]],
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
      this.addInForm();
    }
  }

  ngOnDestroy() {
    this.formBudget.reset();
  }
  async presentSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Operación Exitosa',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  async addBudget() {
    if (this.formBudget.invalid) {
      console.error('El formulario no es válido');
      return;
    }

    const token = await this.storage.get('token');
    if (token === null) {
      console.error('Token no encontrado');
      return;
    }

    const decoded = jwtDecode(token) as any;
    const userId = decoded.id;

    let budget = {
      userId: userId,
      clientId: this.formBudget.get('clientId')?.value,
      name: this.formBudget.get('name')?.value,
      lastName: this.formBudget.get('lastName')?.value,
      typeBudget: this.formBudget.get('typeBudget')?.value,
      brand: this.formBudget.get('brand')?.value,
      model: this.formBudget.get('model')?.value,
      tuition: this.formBudget.get('tuition')?.value,
      kilometers: this.formBudget.get('kilometers')?.value,
      horsepower: this.formBudget.get('horsepower')?.value,
      typeVehicle: this.formBudget.get('typeVehicle')?.value,
      insuranceName: this.formBudget.get('insuranceName')?.value,
      price: this.formBudget.get('price')?.value,
    };

    this.budgetService.addBudget(budget, token).subscribe(
      (res) => {
        console.log('Presupuesto creado', res);
        this.presentSuccessAlert('El presupuesto ha sido creado con éxito.');
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
      clientId: this.budget.clientId,
      name: this.budget.name,
      lastName: this.budget.lastName,
      typeBudget: this.budget.typeBudget,
      brand: this.budget.brand,
      model: this.budget.model,
      tuition: this.budget.tuition,
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

    const userId = this.budget.id;
    if (!userId) {
      console.error('No hay un ID de usuario para editar');
      return;
    }

    const token = await this.storage.get('token');
    if (!token) {
      console.error('Token de autenticación no encontrado');
      return;
    }

    const formValue = this.formBudget.value;
    const budgetToUpdate = {
      username: formValue.username,
      userId: formValue.userId,
      clientId: formValue.clientId,
      name: formValue.name,
      lastName: formValue.lastName,
      typeBudget: formValue.typeBudget,
      brand: formValue.brand,
      model: formValue.model,
      tuition: formValue.tuition,
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
        this.presentSuccessAlert('El presupuesto ha sido creado con éxito.');
        this.editingForm = false;
      },
      (error) => {
        console.error('Error al actualizar el usuario', error);
      }
    );
  }
}
