import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
import { User } from '../user';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
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
    private storage: Storage
  ) {}

  ngOnInit() {}
  async init() {
    await this.storage.create();
  }
  login(form: NgForm) {
    let user: User = {
      username: form.value.username,
      password: form.value.password,
    };
    this.authService.login(user).subscribe(
      async (res) => {
        if (!res.access_token) {
          this.presentAlert('invalid credentials');
          return;
        }

        const isAdmin = await this.storage.get('isAdmin'); // Modificado aquí
        if (isAdmin === true) {
          this.router.navigateByUrl('/register');
        } else {
          this.router.navigateByUrl('/main');
        }
        form.reset();
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
