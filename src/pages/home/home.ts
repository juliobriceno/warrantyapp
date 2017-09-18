import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuopcionsPage } from "../index.paginas";
import { Http } from '@angular/http';
import { AlertController, LoadingController } from 'ionic-angular';

import { url } from "../../config/url.config"

import { SharedParametersProvider } from "../../providers/shared-parameters/shared-parameters"

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
  transferuser:any = {};
  devicesfiltered:any = [];
  constructor(public navCtrl: NavController,
             public http: Http, public alertCtrl: AlertController,
             public loadingCtrl: LoadingController, public ctrSharedParametersProvider: SharedParametersProvider) {

    let mUrl = url + 'api/GetInitialData';
    const body = {};

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
          this.user = res.json().User;
          this.transferuser = res.json().transferusers;
          this.devicesfiltered = this.devices;

          this.ctrSharedParametersProvider.setDevices(this.devices);
          this.ctrSharedParametersProvider.setMessages(this.messages);
          this.ctrSharedParametersProvider.setUser(this.user);
          this.ctrSharedParametersProvider.setTransferUser(this.transferuser);
          this.ctrSharedParametersProvider.setDevicesFiltered(this.devicesfiltered);

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

  ionViewWillEnter(){
    if (typeof this.user != undefined){
      this.devices = this.ctrSharedParametersProvider.getDevices();
      this.messages = this.ctrSharedParametersProvider.getMessages();
      this.user = this.ctrSharedParametersProvider.getUser();
      this.transferuser = this.ctrSharedParametersProvider.getTransferUser();
      this.devicesfiltered = this.ctrSharedParametersProvider.getDevicesFiltered();
    }
  }

}
