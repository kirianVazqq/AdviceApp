import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.page.html',
  styleUrls: ['./form-client.page.scss'],
})
export class FormClientPage implements OnInit {
  formClient!: FormGroup;
  flag?: string;
  client: any = [];
  editingForm: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private clientService: ClientService,
    private storage: Storage,
    private router: Router) {}

  ngOnInit() {
    this.storage.create();
    this.formClient = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numberAccount: ['', Validators.required],  // Corregir aquí
    });
    
    const state = this.router.getCurrentNavigation()?.extras.state;

    if (state && state['flag'] && state['client']) {
      this.editingForm = state['flag'];
      this.client = state['client'];
      // Muestra los valores por consola


      this.addInForm();
    } else {
      console.log('Los valores no están presentes en el state');
    }
  }
  ngOnDestroy() {
    this.formClient.reset();
  }
  async addClient() {
    if (this.formClient.invalid) {
      console.error('El formulario no es válido');
      return;
    }
 

    const token = await this.storage.get('token');
    if (token === null) {
      console.error('Token no encontrado');
      return;
    }
    const decoded = jwtDecode(token) as any; // Aquí estás diciendo que decoded puede ser de cualquier tipo
    const userId = decoded.id; 
    let client = {
      userId: userId,
      name: this.formClient.get('name')?.value,
      lastName: this.formClient.get('lastName')?.value,
      address: this.formClient.get('address')?.value,
      dni: this.formClient.get('dni')?.value,
      email: this.formClient.get('email')?.value,
      numberAccount: this.formClient.get('numberAccount')?.value,

      // Añade más campos según sea necesario
    };
    this.clientService.addClient(client, token).subscribe(
      (res) => {
        console.log('Cliente creado', res);
        this.formClient.reset();
      },
      (error) => {
        console.error('Error al crear el cliente', error);
      }
    );
  }
  async addInForm() {
    this.formClient.patchValue({
      name: this.client.name,
      lastName: this.client.lastName,
      address: this.client.address,
      dni: this.client.dni,
      email: this.client.email,
      numberAccount: this.client.numberAccount,


    });
  }
  async editClient() {
    if (!this.formClient.valid) {
      console.error('El formulario no es válido');
      return;
    }
    const userId = this.client.id; // Asegúrate de que editingId se ha definido y se ha establecido correctamente
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

    const formValue = this.formClient.value;
    const clientToUpdate = {
      name: formValue.name,
      lastName: formValue.lastName,
      address: formValue.address,
      dni: formValue.dni,
      phoneNumber:formValue.phoneNumber,
      email: formValue.email,

    };

    this.clientService.editClient(userId, clientToUpdate, token).subscribe(
      (response) => {
        console.log('Usuario actualizado exitosamente', response);
      this.formClient.reset();
      this.editingForm=false;
      },
      (error) => {
        console.error('Error al actualizar el usuario', error);
      }
    );
  }
  
}

