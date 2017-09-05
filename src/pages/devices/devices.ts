import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, AlertController   } from 'ionic-angular';
import { NewdevicesPage } from "../index.paginas";


@IonicPage()
@Component({
  selector: 'page-devices',
  templateUrl: 'devices.html',
})
export class DevicesPage {
  tab9:any = NewdevicesPage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public actionsheetCtrl: ActionSheetController,
              public alertCtrl: AlertController
              ) {
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
                  let actionSheet = this.actionsheetCtrl.create({
                    title: 'Files',
                    cssClass: 'action-sheets-basic-page',
                    buttons: [
                      {
                        text: 'file1.ppt 1.67MB',
                        icon: !this.platform.is('ios') ? 'cloud-download' : null,
                        handler: () => {
                          console.log('Delete clicked');
                        }
                      },
                      {
                        text: 'file2.xls 1.27MB',
                        icon: !this.platform.is('ios') ? 'cloud-download' : null,
                        handler: () => {
                          console.log('Delete clicked');
                        }
                      },
                      {
                        text: 'file3.xls 1.87MB',
                        icon: !this.platform.is('ios') ? 'cloud-download' : null,
                        handler: () => {
                          console.log('Delete clicked');
                        }
                      },

                      {
                        text: 'Cancel',
                        role: 'cancel', // will always sort to be on the bottom
                        icon: !this.platform.is('ios') ? 'close' : null,
                        handler: () => {
                          console.log('Cancel clicked');
                        }
                      }
                    ]
                  });
                  actionSheet.present();
              }
              ionViewDidLoad() {
                console.log('ionViewDidLoad DevicesPage');
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
