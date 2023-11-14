import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:4000';

  constructor(private  httpClient:  HttpClient, private  storage:  Storage) { }

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

  getUsers(token: string) {
    let myOptions = this.getOptions(token);
    console.log(myOptions)
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/users`, myOptions);


 
  }
  deleteUser(userId: number, token: string) {
    let myOptions = this.getOptions(token);
    return this.httpClient.delete(`${this.AUTH_SERVER_ADDRESS}/api/users/${userId}`, myOptions);
  }
  
  editUser(userId: number, user: any, token: string): Observable<any> {
    let myOptions = this.getOptions(token);
    return this.httpClient.put(`${this.AUTH_SERVER_ADDRESS}/api/users/${userId}`, user, myOptions);

  };
}



