import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalProvider} from "../../providers/global/global";
import {HttpClient} from "@angular/common/http";
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  data:any;
  checkLogin(){
    this.storage.get('loginData').then((data)=>{
      if (data != null) {
        this.global.loginStatus = true;
        this.global.loginData = data;
        console.log(this.global.loginData);
        this.navCtrl.setRoot(TabsPage);
      }else {
        this.navCtrl.setRoot(LoginPage)
      }
    });
  }
  checkServer(){
    this.data = this.httpClient.get(this.global.apiUrl + 'status');
    this.data
      .subscribe(data => {
        if (data.status == 'success'){
          this.checkLogin();
        }else {
          alert('Something wrong');
        }
      },error=> {
        alert('Server not responding');
      });
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public global: GlobalProvider,
              private storage: Storage, public httpClient: HttpClient) {
    this.checkServer();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
