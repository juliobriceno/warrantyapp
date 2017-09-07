import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import {HomePage,DevicesPage,AccountPage,TabsPage,NewdevicesPage,MenuopcionsPage, MenufilePage,TransferDevicePage,ModalFilePage} from '../pages/index.paginas';
import { SharedParametersProvider } from '../providers/shared-parameters/shared-parameters';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import { CompleteTestServiceProvider } from '../providers/complete-test-service/complete-test-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DevicesPage,
    AccountPage,
    TabsPage,
    NewdevicesPage,
    MenuopcionsPage,
    MenufilePage,
    TransferDevicePage,
    ModalFilePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AutoCompleteModule,
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
    MenufilePage,
    TransferDevicePage,
    ModalFilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SharedParametersProvider,
    CompleteTestServiceProvider
  ]
})
export class AppModule {}
