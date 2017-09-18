import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-menuopcions',
  templateUrl: 'menuopcions.html',
})
export class MenuopcionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public platform : Platform
  )
  {
  }

  ExitApp(){
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to exit Wappanty?',
      buttons: [{
        text: "exit?",
        handler: () => { this.exitApp() }
      }, {
        text: "Cancel",
        role: 'cancel'
      }]
    })
    alert.present();
  }

  exitApp(){
    this.platform.exitApp();
  }

}
