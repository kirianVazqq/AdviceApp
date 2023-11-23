import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NoteService {
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

  getNote(token: string) {
    let myOptions = this.getOptions(token);
    return this.httpClient.get(
      `${this.AUTH_SERVER_ADDRESS}/api/note`,
      myOptions
    );
  }

  getNoteByUser(token: string, userId: number) {
    let myOptions = this.getOptions(token);
    return this.httpClient.get(
      `${this.AUTH_SERVER_ADDRESS}/api/note/user/${userId}`,
      myOptions
    );
  }
  deleteNote(noteId: number, token: string) {
    let myOptions = this.getOptions(token);
    return this.httpClient.delete(
      `${this.AUTH_SERVER_ADDRESS}/api/note/${noteId}`,
      myOptions
    );
  }

  editNote(noteId: number, note: any, token: string): Observable<any> {
    let myOptions = this.getOptions(token);
    return this.httpClient.put(
      `${this.AUTH_SERVER_ADDRESS}/api/note/${noteId}`,
      note,
      myOptions
    );
  }
  // Método para añadir un nuevo presupuesto
  addNote(note: any, token: string): Observable<any> {
    let myOptions = this.getOptions(token);
    return this.httpClient.post(
      `${this.AUTH_SERVER_ADDRESS}/api/note`,
      note,
      myOptions
    );
  }
}
