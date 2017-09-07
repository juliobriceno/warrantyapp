import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, AlertController, LoadingController, ModalController, ViewController } from 'ionic-angular';
import { NewdevicesPage } from "../index.paginas";
import { Http } from '@angular/http';
import {ViewChild} from '@angular/core';

import { url } from "../../config/url.config"

import { SharedParametersProvider } from "../../providers/shared-parameters/shared-parameters"
import { CompleteTestServiceProvider } from '../../providers/complete-test-service/complete-test-service';

@IonicPage()
@Component({
  selector: 'page-transfer-device',
  templateUrl: 'transfer-device.html',
})
export class TransferDevicePage {

  @ViewChild('searchbar') searchbar: any;

  device: string = this.navParams.get('device');

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public actionsheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public http: Http,
              public ctrSharedParametersProvider: SharedParametersProvider,
              public ctrlcompleteTestService: CompleteTestServiceProvider,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController
              ) {
              }

  TransferDevice(device){
    if (typeof this.searchbar.getSelection() == 'undefined'){
      let alert = this.alertCtrl.create({
        title: 'Ohhh',
        subTitle: 'You must choose a valid email',
        buttons: ['Ok']
      });
      alert.present();
      return 0;
    }
    console.log(this.searchbar.getSelection());
    let confirm = this.alertCtrl.create({
      title: 'Sure?',
      message: 'Are you sure that you like to transfer this device?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {

            let mUrl = url + 'api/TransferDevice';

            const body = { strSerial: device.strSerial, strEmailTransfer: this.searchbar.getSelection().email };

            let loading = this.loadingCtrl.create({
              content: 'Working...',
              spinner: 'ios'
            });

            loading.present();

            this.http
              .post( mUrl, body ).subscribe(res => {
                loading.dismiss();
                if (res.json().Result == 'ok' ){
                  let alert = this.alertCtrl.create({
                    title: 'Great!',
                    subTitle: 'Device was transfer',
                    buttons: ['Ok']
                  });
                  alert.present();
                  this.viewCtrl.dismiss({ result: 'transfered'});
                }
                else{
                  let alert = this.alertCtrl.create({
                    title: 'Oops!',
                    subTitle: 'Credentials are invalid! Please register',
                    buttons: ['Ok']
                  });
                  alert.present();
                }
              }
            )

          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  closeModal() {
    this.viewCtrl.dismiss({ result: 'nc'});
  }

}
