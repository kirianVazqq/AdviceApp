import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.page.html',
  styleUrls: ['./form-client.page.scss'],
})
export class FormClientPage implements OnInit {
  formClient!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formClient = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      Direccion: ['', Validators.required],
      dni: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
}
