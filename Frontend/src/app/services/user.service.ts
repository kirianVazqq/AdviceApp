import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  endPoint = 'http://localhost:8080/api/users';
  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get(this.endPoint);
  }

  addUser(user: any) {
    return this.httpClient
      .post(this.endPoint, user)
      .pipe(tap((_) => console.log(`User ${user.username} added `)));
  }

  deleteUser(id: number) {
    return this.httpClient
      .delete(this.endPoint + '/' + id)
      .pipe(tap((_) => console.log(`User deleted: ${id}`)));
  }
  editUser(
    id: number,
    email: string,
    username: string,
    password: string
  ): Observable<string> {
    return this.httpClient.put<string>(this.endPoint + `/${id}`, {
      email,
      username,
      password,
    });
  }
}
