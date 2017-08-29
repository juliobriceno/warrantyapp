import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuopcionsPage } from "../index.paginas";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tab10:any = MenuopcionsPage;
  menu:string="alert";
  constructor(public navCtrl: NavController) {

  }

}
