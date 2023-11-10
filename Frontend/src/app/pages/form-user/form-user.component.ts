import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent implements OnInit {
  users: any = [];
  editingId: number | null = null;
  formUser!: FormGroup;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
  
  }
 

  addUser() {

      
  }
  editUser() {

    }

  deleteUser(id: number) {
  

  }
  addInfoInForm(user: any, id: number) {

}
}

