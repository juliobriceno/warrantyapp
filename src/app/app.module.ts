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
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';

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
    IonicModule.forRoot(MyApp,{
    iconMode: 'md',
    mode:'md'

    })
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
    CompleteTestServiceProvider,
    FileChooser,
    File,
    FilePath
  ]
})
export class AppModule {}
