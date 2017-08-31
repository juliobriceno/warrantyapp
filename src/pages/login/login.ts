import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage, HomePage } from "../index.paginas";
import { AlertController, LoadingController } from 'ionic-angular';

import { url } from "../../config/url.config"

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  tab8:any = TabsPage;
  segments:string="login";
  constructor(public navCtrl: NavController, public navParams: NavParams,
             public http: Http, public alertCtrl: AlertController,
             public loadingCtrl: LoadingController) {
  }

  correo:string = '';
  contrasena:string = '';

  Login(){
    let mUrl = url + 'Logon';

    const body = {userLogon: { strEmail: this.correo, strPassword: this.contrasena }};

    let loading = this.loadingCtrl.create({
      content: 'Working...',
      spinner: 'ios'
    });

    loading.present();

    this.http
      .post( mUrl, body ).subscribe(res => {
        loading.dismiss();
        if (res.json().Result == 'ok' ){
          this.navCtrl.push( HomePage )
        }
        else{
          let alert = this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'Credentials are invalid! Please register',
            buttons: ['Ok']
          });
          alert.present();        }
      }
    )
  }

}
