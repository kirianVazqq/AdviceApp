import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}
  users: any[] = [];

  ngOnInit() {
    // this.getUsers();
  }

  register(form: NgForm) {
    let user: User = {
      // id: null,
      username: form.value.email,
      password: form.value.password,
      name: form.value.name,
      isAdmin: false,
    };
    this.authService.register(user).subscribe((res) => {
      console.log('Usuario creado');
    });
  }
  getUsers() {
    const token = localStorage.getItem('token');
    if (token === null) {
      console.error(
        'Token no encontrado'
      );
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
}
