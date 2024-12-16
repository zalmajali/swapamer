import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestupimPageRoutingModule } from './testupim-routing.module';

import { TestupimPage } from './testupim.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestupimPageRoutingModule
  ],
  declarations: [TestupimPage]
})
export class TestupimPageModule {}
