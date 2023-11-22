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
  constructor(private clientService: ClientService, private storage: Storage) {}

  ngOnInit() {
    this.getClientByUser();
  }
  clients: any[] = [];
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
}
