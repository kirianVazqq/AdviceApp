import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
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
      userId: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      dni: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],  // Corregir aquí
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

  async addClient() {
    if (this.formClient.invalid) {
      console.error('El formulario no es válido');
      return;
    }
    let client = this.formClient.value;
    const token = await this.storage.get('token');
    if (token === null) {
      console.error('Token no encontrado');
      return;
    }

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
      userId: this.client.userId,
      name: this.client.name,
      lastName: this.client.lastName,
      address: this.client.address,
      dni: this.client.dni,
      phoneNumber:this.client.phoneNumber,
      email: this.client.email,


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

