import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { AdviserService } from 'src/app/services/adviser.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-adviser',
  templateUrl: './adviser.page.html',
  styleUrls: ['./adviser.page.scss'],
})
export class AdviserPage implements OnInit {
  constructor(
    private adviserService: AdviserService,
    private photoService: PhotoService,
    private storage: Storage,
    private formBuilder: FormBuilder
  ) {
    this.init();
  }
  editingId?: number;
  editButtonPressed: boolean = false;
  formAdviser!: FormGroup;
  adviser: any[] = [];
  capturedPhoto: string = "";
  async init() {
    await this.storage.create();
  }
  ngOnInit() {
    this.getAdviser();
    this.formAdviser = this.formBuilder.group({
      userId: ['', Validators.required],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dni: ['', Validators.required],
    });
  }

  async addAdviser() {
    if (this.formAdviser.invalid) {
      console.error('El formulario no es válido');
      return;
    }
    let adviser = this.formAdviser.value;
    const token = await this.storage.get('token');
    if (token === null) {
      console.error('Token no encontrado');
      return;
    }
    let blob = null;
    if (this.capturedPhoto != "") {
      const response = await fetch(this.capturedPhoto);
      blob = await response.blob();
    }
    this.adviserService.addAdviser(adviser, token, blob).subscribe(
      (res) => {
        console.log('Presupuesto creado', res);
        this.formAdviser.reset();
        this.getAdviser();
      },
      (error) => {
        console.error('Error al crear el presupuesto', error);
      }
    );
  }

  async editAdviser() {
    if (!this.formAdviser.valid) {
      console.error('El formulario no es válido');
      return;
    }

    // Obtener el token de autenticación si es necesario para tu API
    const token = await this.storage.get('token');
    if (!token) {
      console.error('Token de autenticación no encontrado');
      return;
    }

    const formValue = this.formAdviser.value;
    const adviserId = this.editingId; // Asegúrate de que editingId se ha definido y se ha establecido correctamente
    if (!adviserId) {
      console.error('No hay un ID de usuario para editar');
      return;
    }
    const adviser = {
      userId: formValue.userId,
      name: formValue.name,
      lastName: formValue.lastName,
      dni: formValue.dni,
    };
     
    this.adviserService.editAdviser(adviserId, adviser, token).subscribe(
      (response) => {
        console.log('Usuario actualizado exitosamente', response);
        this.formAdviser.reset();
        this.getAdviser();
      },
      (error) => {
        console.error('Error al actualizar el usuario', error);
      }
    );
  }
  async getAdviser() {
    const token = await this.storage.get('token');
    if (token === null) {
      console.error('Token no encontrado');
      return;
    }

    this.adviserService.getAdviser(token).subscribe(
      (data: any) => {
        this.adviser = data;
      },
      (error) => {
        console.error('Error al obtener los presupuestos', error);
      }
    );
  }
  addInForm(adviser: any, idAdviser: number) {
    this.editButtonPressed = true;
    this.editingId = idAdviser;
    this.formAdviser.patchValue({
      userId: adviser.userId,
      name: adviser.name,
      lastName: adviser.lastName,
      dni: adviser.dni,
    });
  }
  async deleteAdviser(adviserId: number) {
    const token = await this.storage.get('token');
    if (token === null) {
      console.error('Token no encontrado');
      return;
    }
    this.adviserService.deleteAdviser(adviserId, token).subscribe(
      (response) => {
        console.log('Asesor eliminado exitosamente', response);
        this.getAdviser();
      },
      (error) => {
        console.error('Error al eliminar el Asesor', error);
      }
    );
  }

  pickImage() {
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    this.capturedPhoto = "";
  }
}
