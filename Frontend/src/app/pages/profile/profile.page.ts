import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { AdviserService } from 'src/app/services/adviser.service';
import { BudgetService } from 'src/app/services/budget.service';
import { ClientService } from 'src/app/services/client.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  formNote!: FormGroup;
  userEmail:string="";
  note: any = [];
  clients: any = [];
  budgets: any = [];
  adviser: any[] = [];
  clientsCount:number=0;
 budgetsCount:number=0;
  constructor(
    private noteService: NoteService,
    private budgetService: BudgetService,
    private clientService: ClientService,
    private storage: Storage,
    private formBuilder: FormBuilder,
    private adviserService: AdviserService,
  ) {}

  ngOnInit() {
    this.getUserEmail ()
    this.getClientByUser()
    this.getBudgetByUser()
    this.getAdviserImage();
    this.storage.create();
    this.formNote = this.formBuilder.group({
      note: ['', Validators.required],
    });
    this.getNoteByUser();
  }

  async addNote() {
    if (this.formNote.invalid) {
      console.error('El formulario no es válido');
      return;
    }

    const token = await this.storage.get('token');
    if (token === null) {
      console.error('Token no encontrado');
      return;
    }

    const note = this.formNote.get('note')?.value;
    const decoded = jwtDecode(token) as any; // Aquí estás diciendo que decoded puede ser de cualquier tipo
    const userId = decoded.id; // TypeScript ya no se quejará porque usamos 'any'
    let noteInfo = {
      info: note,
      userId: userId,
    };
    console.log(note);
    this.noteService.addNote(noteInfo, token).subscribe(
      (res) => {
        console.log('Nota creada', res);
        this.formNote.reset();
        this.getNoteByUser();
      },
      (error) => {
        console.error('Error al crear la nota', error);
      }
    );
  }
  async getNoteByUser() {
    const token = await this.storage.get('token');
    if (token === null) {
      console.error('Token no encontrado');
      return;
    }

    const decoded = jwtDecode(token) as any; // Aquí estás diciendo que decoded puede ser de cualquier tipo
    const userId = decoded.id; // TypeScript ya no se quejará porque usamos 'any'
    this.noteService.getNoteByUser(token, userId).subscribe(
      (data: any) => {
        this.note = data;
      },
      (error) => {
        console.error('Error al obtener los presupuestos', error);
      }
    );
  }

  async deleteNote(noteId: number) {
    const token = await this.storage.get('token');
    if (token) {
      this.noteService.deleteNote(noteId, token).subscribe(
        (response) => {
          console.log('Nota eliminada');
          this.getNoteByUser();
        },
        (error) => {
          console.error('Error al eliminar el usuario', error);
        }
      );
    } else {
      console.error('Token no encontrado');
    }
  }
  async logoutAndRedirect() {
    await this.storage.clear();  // Esto borra todo el almacenamiento local
    // this.router.navigateByUrl('/start');  
  }

  async getAdviserImage() {
    const token = await this.storage.get('token');
    if (token === null) {
      console.error('Token no encontrado');
      return;
    }
    const decoded = jwtDecode(token) as any; // Aquí estás diciendo que decoded puede ser de cualquier tipo
    const userId = decoded.id; // TypeScript ya no se quejará porque usamos 'any'
    this.adviserService.getAdviserByUser(token, userId).subscribe(
      (data: any) => {
        this.adviser = data;
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
        this.clientsCount = data.length;
        
      },
      (error) => {
        console.error('Error al obtener los presupuestos', error);
      }
    );
  }

  async getBudgetByUser() {
    const token = await this.storage.get('token');
    if (token === null) {
      console.error('Token no encontrado');
      return;
    }

    const decoded = jwtDecode(token) as any; // Aquí estás diciendo que decoded puede ser de cualquier tipo
    const userId = decoded.id; // TypeScript ya no se quejará porque usamos 'any'
    this.budgetService.getBudgetsByUser(token, userId).subscribe(
      (data: any) => {
        this.budgets = data;
        this.budgetsCount = data.length;
        
      },
      (error) => {
        console.error('Error al obtener los presupuestos', error);
      }
    );
  }
 async getUserEmail (){
  const token = await this.storage.get('token');
  if (token === null) {
    console.error('Token no encontrado');
    return;
  }
  const decoded = jwtDecode(token) as any; // Aquí estás diciendo que decoded puede ser de cualquier tipo
  const userEmail = decoded.email; 
  this.userEmail= userEmail
  }
}
