import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from "../index.paginas";

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
             public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Login(){
    let mUrl = url + 'Logon';

    const body = {userLogon: { strEmail: 'julio.briceno@gmail.com', strPassword: '333' }};

    this.http
      .post( mUrl, body ).subscribe(res => alert(res.json().Result ));
  }

}
