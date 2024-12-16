import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendpointuserPageRoutingModule } from './sendpointuser-routing.module';

import { SendpointuserPage } from './sendpointuser.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendpointuserPageRoutingModule
  ],
  declarations: [SendpointuserPage],
})
export class SendpointuserPageModule {}
