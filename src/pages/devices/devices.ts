import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, AlertController, LoadingController, ModalController  } from 'ionic-angular';
import { NewdevicesPage } from "../index.paginas";
import { Http } from '@angular/http';
import {ViewChild} from '@angular/core';

import { url } from "../../config/url.config"

import { TransferDevicePage } from "../transfer-device/transfer-device";

import { SharedParametersProvider } from "../../providers/shared-parameters/shared-parameters"
import { CompleteTestServiceProvider } from '../../providers/complete-test-service/complete-test-service';

@IonicPage()
@Component({
  selector: 'page-devices',
  templateUrl: 'devices.html',
})
export class DevicesPage {
  tab9:any = NewdevicesPage;

  devices:any = [];
  messages:any = [];
  user:any = {};
  transferuser:any = {};
  devicesfiltered:any = [];
  @ViewChild('searchbar') searchbar: any;
  txtSearch:string= '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public actionsheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public http: Http,
              public ctrSharedParametersProvider: SharedParametersProvider,
              public ctrlcompleteTestService: CompleteTestServiceProvider,
              public modalCtrl: ModalController
              ) {
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

              openTransferDevice(device){
                let modalTransferDevicePage = this.modalCtrl.create(TransferDevicePage, {device: device});
                modalTransferDevicePage.onDidDismiss(data => {
                  if (data.result == 'transfered'){
                    this.devices = this.devices.filter(function (el){
                      return el.strSerial != device.strSerial
                    })
                    this.devicesfiltered = this.devices;
                  }
                });
                modalTransferDevicePage.present();
              }

              SearchDevices(){
                var strSearch = this.txtSearch;
                this.devicesfiltered = this.devices;
                this.devicesfiltered = this.devicesfiltered.filter(function (el) {
                    return el.make.name.toUpperCase().indexOf(strSearch.toUpperCase()) > -1 || el.model.name.toUpperCase().indexOf(strSearch.toUpperCase()) > -1 || el.category.name.toUpperCase().indexOf(strSearch.toUpperCase()) > -1
                })
              }

              DeactivateDevice(device){

                let mUrl = url + 'api/DeactivateDevice';

                const body = { strSerial: device.strSerial, Status: device.Status };

                let loading = this.loadingCtrl.create({
                  content: 'Working...',
                  spinner: 'ios'
                });

                loading.present();

                this.http
                  .post( mUrl, body ).subscribe(res => {
                    loading.dismiss();
                    if (res.json().Result == 'ok' ){
                      var msg = '';
                      if (device.Status == false) {
                          msg = 'Your device was deativated! Remember you can re-activate any time.';
                      }
                      else {
                          msg = 'Your device is active now.';
                      }

                      let alert = this.alertCtrl.create({
                        title: 'Great!',
                        subTitle: msg,
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

              doRadio() {
                let alert = this.alertCtrl.create();
                alert.setTitle('Filter');

                alert.addInput({
                  type: 'radio',
                  label: 'Current',
                  value: 'Current',
                  checked: true
                });
                alert.addInput({
                  type: 'radio',
                  label: 'Past',
                  value: 'Past'

                });
                alert.addInput({
                  type: 'radio',
                  label: 'Close',
                  value: 'Close'

                });
               alert.addButton('Cancel');


                alert.present();
              }

              ShowFiles(device) {
                  var mybuttons = [];
                  var micon = !this.platform.is('ios') ? 'cloud-download' : null;
                  device.Files.forEach(function(file) {
                    mybuttons.push(
                      {
                        text: file.FileName,
                        icon: micon,
                        handler: () => {
                          window.open(file.FilewebViewLink, '_blank')
                        }
                      }
                    );
                  });
                  let actionSheet = this.actionsheetCtrl.create({
                    title: 'Files',
                    cssClass: 'action-sheets-basic-page',
                    buttons: mybuttons
                  });
                  actionSheet.present();
              }

              doPrompt() {
                let prompt = this.alertCtrl.create({
                  title: 'Transfer',
                  message: "Type user to transfer this device",
                  inputs: [
                    {
                      name: 'email',
                      placeholder: 'Email'
                    },
                  ],
                  buttons: [
                    {
                      text: 'Cancel',
                      handler: data => {
                        console.log('Cancel clicked');
                      }
                    },
                    {
                      text: 'Transfer',
                      handler: data => {
                        console.log('Saved clicked');
                      }
                    }
                  ]
                });
                prompt.present();
              }


}
