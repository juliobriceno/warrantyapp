import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalFilePage } from './modal-file';

@NgModule({
  declarations: [
    ModalFilePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalFilePage),
  ],
})
export class ModalFilePageModule {}
