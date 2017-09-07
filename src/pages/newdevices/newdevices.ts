import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MenufilePage } from "../index.paginas";
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import {ModalFilePage } from "../index.paginas";

@IonicPage()
@Component({
  selector: 'page-newdevices',
  templateUrl: 'newdevices.html',
})
export class NewdevicesPage {
  ModalFile:any =  ModalFilePage;
  @ViewChild(Slides) slides: Slides;
  menufile:any = MenufilePage;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {

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
