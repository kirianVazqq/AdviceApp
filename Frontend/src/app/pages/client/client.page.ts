import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

import { Storage } from '@ionic/storage-angular';
import { jwtDecode } from 'jwt-decode';
import { ClientService } from 'src/app/services/client.service';
@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private clientService: ClientService,
    private storage: Storage
  ) {
    this.init();
  }
  clients: any[] = [];
  flag: boolean = true;
  async init() {
    await this.storage.create();
  }

  ngOnInit() {
    this.getClientByUser();
  }
  async getClient() {
    const token = await this.storage.get('token');
    if (token === null) {
      console.error('Token no encontrado');
      return;
    }
    this.clientService.getClient(token).subscribe(
      (data: any) => {
        this.clients = data;
      },
      (error) => {
        console.error('Error al obtener los presupuestos', error);
      }
    );
  }

  async getClientByUser() {
    const token = await this.storage.get('token');
    if (token === null) {
      console.error('Token no encontrado');
      return;
    }

    const decoded = jwtDecode(token) as any; // Aquí estás diciendo que decoded puede ser de cualquier tipo
    const userId = decoded.id; // TypeScript ya no se quejará porque usamos 'any'
    this.clientService.getClientByUser(token, userId).subscribe(
      (data: any) => {
        this.clients = data;
      },
      (error) => {
        console.error('Error al obtener los presupuestos', error);
      }
    );
  }

  addInForm(client: any) {
    const navigationExtras = {
      state: {

        flag: this.flag,
        client: client,
      },
    };
    this.router.navigate(['/form-client'], navigationExtras);
  }

  async deleteClient(clientId: number) {
    const token = await this.storage.get('token');
    if (token) {
      this.clientService.deleteClient(clientId, token).subscribe(
        (response) => {
          console.log('Presupuesto eliminado');
          this.getClientByUser();
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
