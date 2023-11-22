import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:4000';

  constructor(private  httpClient:  HttpClient) { }

  private getOptions(token: string){

    let bearerAccess = 'Bearer ' + token;

    let options = {
      headers: {
        'Authorization' : bearerAccess,
        // 'Content-Type' : 'application/x-www-form-urlencoded',
      }
      //, withCredentials: true
    };

    return options;
  }

  getClient(token: string) {
    let myOptions = this.getOptions(token);
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/clients`, myOptions);
  }
  
  getClientByUser(token: string, userId:number) {
    let myOptions = this.getOptions(token);
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/clients/user/${userId}`, myOptions);
  }
  deleteClient(clientId: number, token: string) {
    let myOptions = this.getOptions(token);
    return this.httpClient.delete(`${this.AUTH_SERVER_ADDRESS}/api/clients/${clientId}`, myOptions);
  }
  
  editClient(clientId: number, client: any, token: string): Observable<any> {
    let myOptions = this.getOptions(token);
    return this.httpClient.put(`${this.AUTH_SERVER_ADDRESS}/api/clients/${clientId}`, client, myOptions);

  };
    // Método para añadir un nuevo presupuesto
    addClient(client: any, token: string): Observable<any> {
      let myOptions = this.getOptions(token);
      return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/clients`, client, myOptions);
    }
}