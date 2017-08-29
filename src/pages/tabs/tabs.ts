import { Component } from '@angular/core';
import { HomePage, DevicesPage,AccountPage } from "../index.paginas";


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1:any = HomePage;
  tab2:any = DevicesPage;
  tab3:any = AccountPage;
  constructor() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
