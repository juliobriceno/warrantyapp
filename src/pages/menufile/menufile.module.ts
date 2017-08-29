import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenufilePage } from './menufile';

@NgModule({
  declarations: [
    MenufilePage,
  ],
  imports: [
    IonicPageModule.forChild(MenufilePage),
  ],
})
export class MenufilePageModule {}
