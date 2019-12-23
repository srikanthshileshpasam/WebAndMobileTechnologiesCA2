import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {HttpClient} from "@angular/common/http";
import {GlobalProvider} from "../../providers/global/global";
import {Storage} from "@ionic/storage";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  register() {
    this.navCtrl.setRoot(RegisterPage);
  }
  loginData = {email: '', password: ''};
  data:any;
  login() {
    console.log(this.loginData);
    if (this.loginData.email == '' || this.loginData.password == '') {
      alert('Kindly complete your form')
    } else {
      this.data = this.httpClient.post(this.global.apiUrl + 'user/login', this.loginData);
      this.data
        .subscribe(data => {
          console.log(data);
          if (data == null) {
            alert('Kindly check your email or password and try again!')
          }else {
            this.storage.set('loginData', data.user);
            this.global.loginData = data.user;
            console.log(this.global.loginData);
            this.global.loginStatus = true;
            this.navCtrl.setRoot(TabsPage)
          }
        },error=> {
          alert('Server not responding');
        });
    }
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient: HttpClient,
              private global: GlobalProvider,private storage: Storage) {
    // storage.set('hello', 'hell1');
    this.storage.get('loginData').then((data)=>{
      if (data != null) {
        console.log(data);
      }else {
        console.log('error');
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
