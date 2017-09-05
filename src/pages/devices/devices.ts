import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, AlertController, LoadingController   } from 'ionic-angular';
import { NewdevicesPage } from "../index.paginas";
import { Http } from '@angular/http';

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

              ionViewCanLeave(){
                this.ctrSharedParametersProvider.setDevices(this.devices);
                this.ctrSharedParametersProvider.setMessages(this.messages);
                this.ctrSharedParametersProvider.setUser(this.user);
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

              openMenu() {
                  var mybuttons = [];
                  mybuttons.push(
                    {
                      text: 'file1.ppt 1.67MB',
                      icon: !this.platform.is('ios') ? 'cloud-download' : null,
                      handler: () => {
                        window.open('https://drive.google.com/file/d/0B_kFczFUGtVTd3lObElVbDc5S1U/view?usp=drivesdk', '_blank')
                      }
                    }
                  );
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
                  message: "Enter type user to transfer this device",
                  inputs: [
                    {
                      name: 'email',
                      placeholder: 'Title'
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
                      text: 'Save',
                      handler: data => {
                        console.log('Saved clicked');
                      }
                    }
                  ]
                });
                prompt.present();
              }


}
