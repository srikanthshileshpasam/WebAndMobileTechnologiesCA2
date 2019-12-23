import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { GlobalProvider } from '../providers/global/global';
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { WelcomePage } from "../pages/welcome/welcome";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {IonicStorageModule} from "@ionic/storage";
import {CartPage} from "../pages/cart/cart";
import {AddProductPage} from "../pages/add-product/add-product";
import {OrdersPage} from "../pages/orders/orders";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';
import {EditPage} from "../pages/edit/edit";
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    WelcomePage,
    CartPage,
    AddProductPage,
    OrdersPage,
    EditPage
  ],
  imports: [
    BrowserModule,HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    WelcomePage,
    CartPage,
    AddProductPage,
    OrdersPage,
    EditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Contacts,
    DeviceOrientation,
    Camera,
    Base64,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider
  ]
})
export class AppModule {}
