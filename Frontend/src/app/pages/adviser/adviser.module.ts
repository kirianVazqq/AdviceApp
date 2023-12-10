import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdviserPageRoutingModule } from './adviser-routing.module';
import { SharedModule } from 'src/app/shared.module';
import { AdviserPage } from './adviser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdviserPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [AdviserPage]
})
export class AdviserPageModule {}
