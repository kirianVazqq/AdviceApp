import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormClientPageRoutingModule } from './form-client-routing.module';

import { FormClientPage } from './form-client.page';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormClientPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
    
  ],
  declarations: [FormClientPage]
})
export class FormClientPageModule {}
