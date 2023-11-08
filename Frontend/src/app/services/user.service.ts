import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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


    // return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/users`, myOptions).pipe(
    //   tap(function (res) {
    //       console.log(res);
    //     })
    // );
  }
}



// endPoint = 'http://localhost:8080/api/users';
// constructor(private httpClient: HttpClient) {}

// getUsers() {
//   return this.httpClient.get(this.endPoint);
// }

// addUser(user: any) {
//   return this.httpClient
//     .post(this.endPoint, user)
//     .pipe(tap((_) => console.log(`User ${user.username} added `)));
// }

// deleteUser(id: number) {
//   return this.httpClient
//     .delete(this.endPoint + '/' + id)
//     .pipe(tap((_) => console.log(`User deleted: ${id}`)));
// }
// editUser(
//   id: number,
//   email: string,
//   username: string,
//   password: string
// ): Observable<string> {
//   return this.httpClient.put<string>(this.endPoint + `/${id}`, {
//     email,
//     username,
//     password,
//   });
// }