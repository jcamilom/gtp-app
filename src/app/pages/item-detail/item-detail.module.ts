import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemDetailPageRoutingModule } from './item-detail-routing.module';

import { ItemDetailPage } from './item-detail.page';

import { ColorPickerComponent } from '../../components/color-picker/color-picker.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ItemDetailPageRoutingModule
  ],
  declarations: [ItemDetailPage, ColorPickerComponent],
  entryComponents: [ColorPickerComponent],
})
export class ItemDetailPageModule {}
