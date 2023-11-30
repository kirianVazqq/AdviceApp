import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
import { User } from '../user';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private storage: Storage,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  loginForm: FormGroup;
  userRoles: any;
  ngOnInit() {}
  async init() {
    await this.storage.create();
  }

  async login() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    let user: User = {
      username: username,
      password: password,
    };
    this.authService.login(user).subscribe(
      async (res) => {
        if (!res.access_token) {
          this.presentAlert('invalid credentials');
          return;
        }
        let user: any = res;
        let rol = user.user.rol;

        if (rol == 'admin') {
          this.router.navigateByUrl('/register');
        } else {
          this.router.navigateByUrl('/main');
        }
        this.loginForm.reset();
      },
      (err) => {
        this.presentAlert('Error');
      }
    );
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: message,
      message: 'Could not login. Try again.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
