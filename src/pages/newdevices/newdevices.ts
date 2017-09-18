import { Component, ChangeDetectorRef  } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { MenufilePage } from "../index.paginas";
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import {ModalFilePage } from "../index.paginas";

import { File } from '@ionic-native/file';

import { Http } from '@angular/http';

import { url } from "../../config/url.config"

import { SharedParametersProvider } from "../../providers/shared-parameters/shared-parameters"

@IonicPage()
@Component({
  selector: 'page-newdevices',
  templateUrl: 'newdevices.html',
})

export class NewdevicesPage {
  ModalFile:any =  ModalFilePage;
  device:any = {};
  devices:any = [];
  messages:any = [];
  make:any = '';
  model:any = '';
  categories:any = [{id: 1, name: '222'}];
  subcategories:any = [{id: 1, name: '333'}];
  warrantytimes:any = [{id: 1, name: '333'}];
  files:any = [];
  tmpfiles:any = [];
  user:any = {};
  myPromises:any = [];
  @ViewChild(Slides) slides: Slides;
  menufile:any = MenufilePage;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public File: File,
              public http: Http,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public ctrSharedParametersProvider: SharedParametersProvider,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ionViewWillEnter(){
    this.files = this.ctrSharedParametersProvider.getFiles();
    this.user = this.ctrSharedParametersProvider.getUser();
    this.devices = this.ctrSharedParametersProvider.getDevices();
    this.messages = this.ctrSharedParametersProvider.getMessages();
  }

  ReadFileFromDisk(iFile){

    let myPromise = new Promise((resolve, reject) => {

      this.File.readAsDataURL(iFile.filepath, iFile.filename).then((b64str) => {

        iFile.data = b64str;

        resolve(iFile);

      }).catch(err => {
        reject(status);
        console.log('readAsDataURL failed: (' + err.code + ")" + err.message);
      })

    });

    this.myPromises.push(myPromise);

    return myPromise;

  }

  saveDevice() {

    var d = new Date(parseInt(this.device.datDatePurchase.substring(0,4)), parseInt(this.device.datDatePurchase.substring(5,7)) - 1, parseInt(this.device.datDatePurchase.substring(8,10)));
    this.device.datDatePurchase = d;
    this.device.FileName = '';
    this.device.Files = [];
    this.device.email = this.user.strEmail;
    this.device.make = { "id" : 1, "name" : this.make };
    this.device.model = { "id" : 1, "name" : this.model };
    this.device.Status = 'Active';
    this.devices.push(this.device);
    this.ctrSharedParametersProvider.setDevices(this.devices);

    let mUrl = url + 'api/NewDeviceRegister';

    const body = { devices: this.devices };

    let loading = this.loadingCtrl.create({
      content: 'Working...',
      spinner: 'ios'
    });

    loading.present();

    this.http
      .post( mUrl, body ).subscribe(res => {
        loading.dismiss();
        if (res.json().Result == 'ok' ){

          this.messages.push({ email: this.user.strEmail, messagetype: 'alert alert-danger alert-dismissible', messagetype2: 'text-danger', messagetype3: 'fa fa-warning', message: this.user.strFirstName + ' Hey!', message2: ' I see you have a new device :)  ...', read: false });
          this.ctrSharedParametersProvider.setMessages(this.messages);

          if (this.files.length == 0){
            let alert = this.alertCtrl.create({
              title: 'Great!',
              subTitle: 'Your Device Warranty is safed now!',
              buttons: ['Ok']
            });
            alert.present();
          }
          else{
            this.saveFiles();
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

  saveFiles() {

    let loading = this.loadingCtrl.create({
      content: 'Working...',
      spinner: 'ios'
    });

    loading.present();

    this.files.forEach((element) => {

      console.log(element);

      this.ReadFileFromDisk(element).then(data => {
        this.tmpfiles.push(data);
        console.log(data);
      });

    });

    Promise.all(this.myPromises).then(values => {

      var myBody = {Files: this.tmpfiles};

      console.log(myBody);

      let mUrl = url + 'api/uploadFileFromDevice';

      this.changeDetectorRef.detectChanges();

      const body = myBody;

        this.http
          .post( mUrl, body ).subscribe(res => {
            loading.dismiss();
            if (res.json().Result == 'ok' ){
              let alert = this.alertCtrl.create({
                title: 'Great!',
                subTitle: 'Your Device Warranty is safed now!',
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
              alert.present();        }
          }
        )

    });

  }

  public event = {
     month: '1990-02-19',
     timeStarts: '07:43',
     timeEnds: '1990-02-20'
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewdevicesPage');
  }


}
