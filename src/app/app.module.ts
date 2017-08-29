import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import {HomePage,DevicesPage,AccountPage,TabsPage,NewdevicesPage,MenuopcionsPage, MenufilePage} from '../pages/index.paginas';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DevicesPage,
    AccountPage,
    TabsPage,
    NewdevicesPage,
    MenuopcionsPage,
    MenufilePage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DevicesPage,
    AccountPage,
    TabsPage,
    NewdevicesPage,
    MenuopcionsPage,
    MenufilePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
