import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AdviserService {
  AUTH_SERVER_ADDRESS: string = 'http://localhost:4000';

  constructor(private httpClient: HttpClient) {}

  private getOptions(token: string) {
    let bearerAccess = 'Bearer ' + token;

    let options = {
      headers: {
        Authorization: bearerAccess,
        // 'Content-Type' : 'application/x-www-form-urlencoded',
      },
      //, withCredentials: true
    };

    return options;
  }

  getAdviser(token: string) {
    let myOptions = this.getOptions(token);
    return this.httpClient.get(
      `${this.AUTH_SERVER_ADDRESS}/api/advisers`,
      myOptions
    );
  }

  getAdviserByUser(token: string, userId: number) {
    let myOptions = this.getOptions(token);
    return this.httpClient.get(
      `${this.AUTH_SERVER_ADDRESS}/api/advisers/user/${userId}`,
      myOptions
    );
  }
  deleteAdviser(adviserId: number, token: string) {
    let myOptions = this.getOptions(token);
    return this.httpClient.delete(
      `${this.AUTH_SERVER_ADDRESS}/api/advisers/${adviserId}`,
      myOptions
    );
  }

  editAdviser(adviserId: number, adviser: any, token: string): Observable<any> {
    let myOptions = this.getOptions(token);
    return this.httpClient.put(
      `${this.AUTH_SERVER_ADDRESS}/api/advisers/${adviserId}`,
      adviser,
      myOptions
    );
  }
  // Método para añadir un nuevo presupuesto
  addAdviser(adviser: any, token: string, blob:any): Observable<any> {
    let body = new FormData();
    body.append('userId', adviser.userId);
    body.append('name', adviser.name);
    body.append('lastName', adviser.lastName);
    body.append('dni', adviser.dni);
    if (blob != null) {
      body.append('file', blob);
    }

    let myOptions = this.getOptions(token);
    return this.httpClient.post(
      `${this.AUTH_SERVER_ADDRESS}/api/advisers`,
      body,
      myOptions,
      
    );
  }
}
