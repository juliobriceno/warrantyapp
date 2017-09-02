import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuopcionsPage } from "../index.paginas";
import { Http } from '@angular/http';
import { AlertController, LoadingController } from 'ionic-angular';

import { url } from "../../config/url.config"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tab10:any = MenuopcionsPage;
  menu:string="alert";
  devices:any = [];
  messages:any = [];
  user:any = {};
  constructor(public navCtrl: NavController,
             public http: Http, public alertCtrl: AlertController,
             public loadingCtrl: LoadingController) {
    let mUrl = url + 'api/GetInitialData';
    const body = {userLogon: { strEmail: '', strPassword: '' }};

    let loading = this.loadingCtrl.create({
      content: 'Working...',
      spinner: 'ios'
    });

    loading.present();
    this.http
      .post( mUrl, body ).subscribe(res => {
        loading.dismiss();
        console.log(res.json().Result);
        if (res.json().Result == 'ok' ){
          this.devices = res.json().Devices;
          this.messages = res.json().Messages;
          this.user = res.json().Devices;
          console.log(this.devices);
          console.log(this.messages);
          console.log(this.user);
        }
        else{
          let alert = this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'System error',
            buttons: ['Ok']
          });
          alert.present();        }
      }
    )
  }

}
