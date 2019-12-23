import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalProvider} from "../../providers/global/global";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {Contacts} from "@ionic-native/contacts";
import {Geolocation} from "@ionic-native/geolocation";
import {LoginPage} from "../login/login";
import {TabsPage} from "../tabs/tabs";
import {WelcomePage} from "../welcome/welcome";
import {Camera, CameraOptions} from "@ionic-native/camera";

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  registerData = {email: '', password: '', phone: '', location: '',name: '', id: 0};
  getOldData() {
    this.registerData.name = this.global.loginData.name;
    this.registerData.email = this.global.loginData.email;
    this.registerData.phone = this.global.loginData.phone;
    this.registerData.location = this.global.loginData.location;
    this.registerData.id = this.global.loginData.id;
    console.log(this.registerData)
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
  update() {
    console.log(this.registerData);
    if (this.registerData.email == '' || this.registerData.name == '' || this.registerData.phone == '' || this.registerData.location == '' ||
      this.registerData.id == 0) {
      alert('Kindly complete your form')
    } else {
      this.data = this.httpClient.post(this.global.apiUrl + 'user/update', this.registerData);
      this.data
        .subscribe(data => {
          console.log(data);
          // alert(data.msg);
          if (data.status == 'success') {
            this.storage.set('loginData', data.user);
            this.global.loginData = data.user;
            console.log(this.global.loginData);
            this.global.loginStatus = true;
            this.navCtrl.setRoot(WelcomePage)
          }else alert(data.msg);
        },error=> {
          alert('Server not responding');
        });
    }
  }
  picChanged:boolean = false;
  pic:any = '';
  capturePic() {
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      // alert(base64Image);
      this.pic = base64Image;
      this.picChanged = true;
    }, (err) => {
      alert('Poster not selected')
      // Handle error
    });
  }
  imageUrl(url) {
    let finalUrl = this.global.domain + 'public/' + url;
    return finalUrl;
  }
  uploadPic() {
    this.data = this.httpClient.post(this.global.apiUrl + 'user/pic/update', {pic: this.pic,id:this.global.loginData.id});
    this.data
      .subscribe(data => {
        console.log(data);
        alert(JSON.stringify(data));
        // this.navCtrl.setRoot(TabsPage);
      },error=> {
        // this.navCtrl.setRoot(TabsPage);
        // alert(JSON.stringify(error));
        // alert('Server not responding');
      });
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public global: GlobalProvider,public httpClient: HttpClient,private storage: Storage,
              private contacts: Contacts,private geolocation: Geolocation,private camera: Camera) {
    this.getOldData()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

}
