import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss'],
})
export class NavbarAdminComponent  implements OnInit {
  constructor(private router: Router,
    private storage: Storage,) {}

  ngOnInit() {}
  navigateRegister() {
    this.router.navigate(['/register']);
  }
  navigateAdviser() {
    this.router.navigate(['/adviser']);
  }
 async logOut() {
      await this.storage.clear();  // Esto borra todo el almacenamiento local
      this.router.navigateByUrl('/start');  
    }
  }
