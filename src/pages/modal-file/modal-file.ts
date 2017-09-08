import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';

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
              public fileChooser: FileChooser,
              public filePath: FilePath,
              public File: File
            ) {
  }

  openFileChooser(){
    this.fileChooser.open().then((uri) => {
     this.filePath.resolveNativePath(uri).then((fileentry) => {
       alert(fileentry);
       alert(uri);
       var imagePath = fileentry.substr(0, fileentry.lastIndexOf('/') + 1);
       var imageName = fileentry.substr(fileentry.lastIndexOf('/') + 1);
       alert(imagePath);
       alert(imageName);
       this.File.readAsDataURL(imagePath, imageName).then((b64str) => {
         alert('Image B64 URL: ' + b64str);
       }).catch(err => {
         console.log('readAsDataURL failed: (' + err.code + ")" + err.message);
       })
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
