import { NgModule,NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesdetalisoutPageRoutingModule } from './servicesdetalisout-routing.module';

import { ServicesdetalisoutPage } from './servicesdetalisout.page';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesdetalisoutPageRoutingModule
  ],
  declarations: [ServicesdetalisoutPage]
})
export class ServicesdetalisoutPageModule {}
