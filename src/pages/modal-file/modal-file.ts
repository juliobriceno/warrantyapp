import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';

@IonicPage()
@Component({
  selector: 'page-modal-file',
  templateUrl: 'modal-file.html',
})
export class ModalFilePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public actionsheetCtrl: ActionSheetController,
              public fileChooser: FileChooser) {
  }

  openFileChooser(){
    this.fileChooser.open()
      .then(uri => console.log(uri))
      .catch(e => console.log(e));
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
    console.log('ionViewDidLoad ModalFilePage');
  }

}
