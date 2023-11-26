import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdviserPageRoutingModule } from './adviser-routing.module';

import { AdviserPage } from './adviser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdviserPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdviserPage]
})
export class AdviserPageModule {}
