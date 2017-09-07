import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferDevicePage } from './transfer-device';

@NgModule({
  declarations: [
    TransferDevicePage,
  ],
  imports: [
    IonicPageModule.forChild(TransferDevicePage),
  ],
})
export class TransferDevicePageModule {}
