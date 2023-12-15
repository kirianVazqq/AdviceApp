import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Storage } from '@ionic/storage-angular';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-client-preview',
  templateUrl: './client-preview.component.html',
  styleUrls: ['./client-preview.component.scss'],
})
export class ClientPreviewComponent implements OnInit {
  clients: any[] = [];

  constructor(private clientService: ClientService, private storage: Storage) {}

  ngOnInit() {
    this.getClientByUser();
  }

  async getClientByUser() {
    const token = await this.storage.get('token');
    if (token === null) {
      console.error('Token no encontrado');
      return;
    }

    const decoded = jwtDecode(token) as any;
    const userId = decoded.id;
    this.clientService.getClientByUser(token, userId).subscribe(
      (data: any) => {
        // Ordenar los clientes por ID de forma descendente
        data.sort((a: any, b: any) => b.id - a.id);

        // Seleccionar los primeros 5 clientes
        this.clients = data.slice(0, 5);
      },
      (error) => {
        console.error('Error al obtener los clientes', error);
      }
    );
  }
}
