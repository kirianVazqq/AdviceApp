import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';

import { ClientPreviewComponent } from '../../components/client-preview/client-preview.component';
import { GraphicComponent } from '../../components/graphic/graphic.component';
import { RightBarrInfoComponent } from '../../components/right-barr-info/right-barr-info.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    SharedModule
  ],
  declarations: [MainPage, ClientPreviewComponent, GraphicComponent, RightBarrInfoComponent]
})
export class MainPageModule {}
