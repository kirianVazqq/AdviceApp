import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
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
    // this.getAllUsers();
    // this.formUser = new FormGroup({
    //   email: new FormControl(''),
    //   username: new FormControl(''),
    //   password: new FormControl(''),
    // });
  }
  // ionViewDidEnter() {}
  // getAllUsers() {
  //   this.userService.getUsers().subscribe((user) => {
  //     this.users = user;
  //   });
  // }

  // addUser() {
  //   const email = this.formUser.get('email')?.value;
  //   const username = this.formUser.get('username')?.value;
  //   const password = this.formUser.get('password')?.value;
  //   this.userService
  //     .addUser({ email, username, password })
  //     .subscribe((response) => {
  //       this.getAllUsers();
  //       this.formUser.reset();
  //     });
  // }
  // editUser() {
  //   const id= this.editingId
  //   const email = this.formUser.get('email')?.value;
  //   const username = this.formUser.get('username')?.value;
  //   const password = this.formUser.get('password')?.value;
  //   if(id==null){
  //     return console.log("El id no puede ser null")
  //   }
  //   return this.userService
  //   .editUser(id,email,username,password)
  //   .subscribe((response) => {
  //     this.getAllUsers();
  //     this.formUser.reset();
  //     });
  //   }

  // deleteUser(id: number) {
  //   this.userService.deleteUser(id).subscribe((response) => {
  //     this.getAllUsers();
  //     this.formUser.reset();
  //   });
  // }
  // addInfoInForm(user: any, id: number) {
  //   this.editingId = id;
  //   this.formUser.setValue({
  //     email: user.email,
  //     username: user.username,
  //     password: user.password,
  //   });
  // }
}

