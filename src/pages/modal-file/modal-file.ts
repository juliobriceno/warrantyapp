import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Http } from '@angular/http';

import { url } from "../../config/url.config"

import { SharedParametersProvider } from "../../providers/shared-parameters/shared-parameters"

@IonicPage()
@Component({
  selector: 'page-modal-file',
  templateUrl: 'modal-file.html',
})
export class ModalFilePage {

  files:any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public actionsheetCtrl: ActionSheetController,
              public fileChooser: FileChooser,
              public filePath: FilePath,
              public File: File,
              public http: Http,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public ctrSharedParametersProvider: SharedParametersProvider
            ) {
  }

  openFileChooser(){
    this.fileChooser.open().then((uri) => {
     this.filePath.resolveNativePath(uri).then((fileentry) => {
       var imagePath = fileentry.substr(0, fileentry.lastIndexOf('/') + 1);
       var imageName = fileentry.substr(fileentry.lastIndexOf('/') + 1);
       this.files.push({filename: imageName, filepath: imagePath});
       this.ctrSharedParametersProvider.setFiles(this.files);
     })
   })
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
