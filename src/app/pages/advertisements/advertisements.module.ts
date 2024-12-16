import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvertisementsPageRoutingModule } from './advertisements-routing.module';

import { AdvertisementsPage } from './advertisements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvertisementsPageRoutingModule
  ],
  declarations: [AdvertisementsPage]
})
export class AdvertisementsPageModule {}
