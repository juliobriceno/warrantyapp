import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage, HomePage } from "../index.paginas";
import { AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { url } from "../../config/url.config"

import { lCountries } from "../../config/lists"

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  tab8:any = TabsPage;
  segments:string="login";
  validate:any={};
  validateRegister:any={};
  slideOneForm: FormGroup;
  countries:any = [];
  user:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
             public http: Http, public alertCtrl: AlertController,
             public loadingCtrl: LoadingController,
             public formBuilder: FormBuilder) {
               this.slideOneForm = formBuilder.group({
                   firstName: [''],
                   lastName: [''],
                   age: ['']
               });
               this.user.strFirstName = '';
  }

  correo:string = 'julio.briceno@gmail.com';
  contrasena:string = '333';

  ionViewWillEnter(){
    this.countries = lCountries;
  }

  Login(){

    this.validate = {};

    var errores = false;

    if (this.correo == ''){
      this.validate.correo = 'errorstyle';
      errores = true;
    }

    if (this.contrasena == ''){
      this.validate.contrasena = 'errorstyle';
      errores = true;
    }

    if (errores == true){
      return 0;
    }

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
          this.navCtrl.push( TabsPage )
        }
        else{
          let alert = this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'Credentials are invalid!',
            buttons: ['Ok']
          });
          alert.present();        }
      }
    )

  }

  RecoverPassword(){

    this.validate = {};

    var errores = false;

    if (this.correo == ''){
      this.validate.correo = 'errorstyle';
      errores = true;
    }

    if (errores == true){
      return 0;
    }

    let mUrl = url + 'RecoverPassword';

    const body = {userLogon: { strEmail: this.correo, strPassword: this.contrasena }};

    let loading = this.loadingCtrl.create({
      content: 'Working...',
      spinner: 'ios'
    });

    loading.present();

    this.http
      .post( mUrl, body ).subscribe(res => {
        loading.dismiss();
        if (res.json().Result == 'Ok' ){
          let alert = this.alertCtrl.create({
            title: 'Great!',
            subTitle: 'We send you a new password to your email account!',
            buttons: ['Ok']
          });
          alert.present();
        }
        else{
          let alert = this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'Credentials are invalid!',
            buttons: ['Ok']
          });
          alert.present();
        }
      }
    )

  }

  NewUserRegister(){

    this.validateRegister = {};

    var errores = false;

    console.log(this.user);

    if (this.user.strFirstName == ''){
      this.validateRegister.strFirstName = 'errorstyle';
      errores = true;
    }

    if (errores == true){
      return 0;
    }

    let mUrl = url + 'NewUserRegister';

    this.user.isvisible = false;

    const body = { user: this.user };

    let loading = this.loadingCtrl.create({
      content: 'Working...',
      spinner: 'ios'
    });

    loading.present();

    this.http
      .post( mUrl, body ).subscribe(res => {
        loading.dismiss();
        if (res.json().Result == 'ok' ){
          this.navCtrl.push( TabsPage )
        }
        else{
          let alert = this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'Credentials are invalid!',
            buttons: ['Ok']
          });
          alert.present();
        }
      }
    )

  }

}
