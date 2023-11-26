import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private storage: Storage,
    private formBuilder: FormBuilder
  ) {
    this.init();
  }
  editingId?: number;
  editButtonPressed: boolean = false;
  formRegister!: FormGroup;
  users: any[] = [];
  async init() {
    await this.storage.create();
  }
  ngOnInit() {
    this.getUsers();
    this.formRegister = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm: ['', Validators.required],
      isAdmin: [false]
    });
  }

  register() {
    if (this.formRegister.invalid) {
      console.error('El formulario no es válido');
      return;
    }

    // Verifica si las contraseñas coinciden (si es necesario)
    if (this.formRegister.value.password !== this.formRegister.value.confirm) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    let user: User = {
      username: this.formRegister.get('username')?.value,
      email: this.formRegister.get('email')?.value,
      password: this.formRegister.get('password')?.value,
      isAdmin: this.formRegister.get('isAdmin')?.value,
      
    };
    console.log(user.isAdmin)
    this.authService.register(user).subscribe(
      (res) => {
        console.log('Usuario creado', res);
        this.formRegister.reset();
        this.getUsers();
      },
      (error) => {
        console.error('Error al registrar el usuario', error);
      }
    );
  }

  async getUsers() {
    const token = await this.storage.get('token');
    if (token === null) {
      console.error('Token no encontrado');
      return;
    }
    this.userService.getUsers(token).subscribe(
      (data: any) => {
        this.users = data;
      },
      (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    );
  }
  async addInForm(user: any, id: number) {
    this.editButtonPressed = true;
    this.editingId = id;
    this.formRegister.patchValue({
      username: user.username,
      email: user.email,
    });
  }

  async editUser() {
    if (!this.formRegister.valid) {
      console.error('El formulario no es válido');
      return;
    }

    // El ID del usuario debe estar disponible para poder editar
    const userId = this.editingId; // Asegúrate de que editingId se ha definido y se ha establecido correctamente
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

    const formValue = this.formRegister.value;
    const userToUpdate = {
      username: formValue.username,
      email: formValue.email,
      password: formValue.password,
      isAdmin: false,
    };

    this.userService.editUser(userId, userToUpdate, token).subscribe(
      (response) => {
        console.log('Usuario actualizado exitosamente', response);
      this.getUsers();
      this.formRegister.reset();
      },
      (error) => {
        console.error('Error al actualizar el usuario', error);
      }
    );
  }

  async deleteUser(userId: number) {
    const token = await this.storage.get('token');
    if (token) {
      this.userService.deleteUser(userId, token).subscribe(
        (response) => {
          console.log('Usuario eliminado');
          this.getUsers();
        },
        (error) => {
          console.error('Error al eliminar el usuario', error);
        }
      );
    } else {
      console.error('Token no encontrado');
    }
  }
}
