import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';

import { lCountries } from "../../config/lists"

import { Http } from '@angular/http';

import { url } from "../../config/url.config"

import { SharedParametersProvider } from "../../providers/shared-parameters/shared-parameters"

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  user:any = {};
  countries:any = [];
  selectOptions = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public ctrSharedParametersProvider: SharedParametersProvider) {

              this.selectOptions = {
                title: 'XXXXXXXXXXX',
                subTitle: 'RRRRRRRRRRRRRR',
                mode: 'ios'
              };

  }



  ionViewWillEnter(){
    this.countries = lCountries;
    if (typeof this.user != undefined){
      this.user = this.ctrSharedParametersProvider.getUser();
      this.user.country = this.countries.filter((el) => {
        return el.id == this.user.country.id
      })[0]
    }
  }

  updateAccount(){

    let mUrl = url + 'api/UpdateUser';

    const body = {user: this.user};

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
            subTitle: 'Your user account was updated!',
            buttons: ['Ok']
          });
          alert.present();
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

  MakeVisible(){

    let mUrl = url + 'api/MakeVisible';

    const body = { lastupdate: new Date(), isvisible: this.user.isvisible };

    let loading = this.loadingCtrl.create({
      content: 'Working...',
      spinner: 'ios'
    });

    loading.present();

    this.http
      .post( mUrl, body ).subscribe(res => {
        loading.dismiss();
        if (res.json().Result == 'ok' ){
          if (this.user.isvisible == true){
            let alert = this.alertCtrl.create({
              title: 'Great!',
              subTitle: 'Another user can send you a warranty for 48 hours!',
              buttons: ['Ok']
            });
            alert.present();
          }
          else{
            let alert = this.alertCtrl.create({
              title: 'Great!',
              subTitle: 'You are not visible for warranty transfers!',
              buttons: ['Ok']
            });
            alert.present();
          }
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

}
