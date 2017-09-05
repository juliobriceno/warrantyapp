import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, AlertController, LoadingController   } from 'ionic-angular';
import { NewdevicesPage } from "../index.paginas";
import { Http } from '@angular/http';
import {ViewChild} from '@angular/core';

import { url } from "../../config/url.config"

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
  devicesfiltered:any = {};
  @ViewChild('searchbar') searchbar: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public actionsheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public http: Http,
              public ctrSharedParametersProvider: SharedParametersProvider,
              public ctrlcompleteTestService: CompleteTestServiceProvider
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

              TransferDevice(device){
                if (typeof this.searchbar.getSelection() == 'undefined'){
                  let alert = this.alertCtrl.create({
                    title: 'Ohhh',
                    subTitle: 'You must choose a valid email',
                    buttons: ['Dismiss']
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
                                title: 'Greate!',
                                subTitle: 'Device was transfer',
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
