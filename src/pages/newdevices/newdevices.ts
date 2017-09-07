import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController } from 'ionic-angular';
import { MenufilePage } from "../index.paginas";
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-newdevices',
  templateUrl: 'newdevices.html',
})
export class NewdevicesPage {
  @ViewChild(Slides) slides: Slides;
  menufile:any = MenufilePage;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public actionsheetCtrl: ActionSheetController) {

  }
  public event = {
     month: '1990-02-19',
     timeStarts: '07:43',
     timeEnds: '1990-02-20'
   }
   dofile() {
       let actionSheet = this.actionsheetCtrl.create({
         title: 'Add archive',
         cssClass: 'action-sheets-basic-page',
         buttons: [
           {
             text: 'Take a picture',
             icon: !this.platform.is('ios') ? 'camera' : null,
             handler: () => {
               console.log('Delete clicked');
             }
           },
           {
             text: 'Take file',
             icon: !this.platform.is('ios') ? 'folder-open' : null,
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
    console.log('ionViewDidLoad NewdevicesPage');
  }
  

}
