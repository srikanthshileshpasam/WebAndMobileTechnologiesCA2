import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {Contacts} from "@ionic-native/contacts";
import {Geolocation} from "@ionic-native/geolocation";
import {HttpClient} from "@angular/common/http";
import {GlobalProvider} from "../../providers/global/global";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerData = {email: '', password: '', phone: '', location: '',name: ''};
  login() {
    this.navCtrl.setRoot(LoginPage);
  }
  choicePhone() {
    this.contacts.pickContact().then((data) => {
      this.registerData.phone = data.phoneNumbers[0].value;
    }).catch((error) => {
      alert(JSON.stringify(error));
    });
  }
  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp);
      this.registerData.location = (resp.coords.latitude).toFixed(4) + ',' + (resp.coords.longitude).toFixed(4);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  data:any;
  register() {
    console.log(this.registerData);
    if (this.registerData.email == '' || this.registerData.name == '' || this.registerData.phone == '' || this.registerData.location == '' || this.registerData.password == '') {
      alert('Kindly complete your form')
    } else {
      this.data = this.httpClient.post(this.global.apiUrl + 'user/register', this.registerData);
      this.data
        .subscribe(data => {
          console.log(data);
          alert(data.msg);
          if (data.status == 'success') {
            this.navCtrl.setRoot(LoginPage)
          }
        },error=> {
          alert('Server not responding');
        });
    }
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,private contacts: Contacts,private geolocation: Geolocation, public httpClient: HttpClient,
              private global: GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
