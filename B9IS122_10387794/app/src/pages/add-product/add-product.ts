import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {GlobalProvider} from "../../providers/global/global";
import {HttpClient} from "@angular/common/http";
import {WelcomePage} from "../welcome/welcome";
import {TabsPage} from "../tabs/tabs";


/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  data:any;
  productData = {name: '', price: 0, image: ''};
  imageSelected: boolean = false;
  addProduct() {
    alert(JSON.stringify(this.productData));
    if (this.productData.name == '' || this.productData.price == 0 || this.imageSelected == false) {
      alert('Something missing!')
    } else {
      this.data = this.httpClient.post(this.global.apiUrl + 'products/add/new/products', this.productData);
      this.data
        .subscribe(data => {
          console.log(data);
          // alert(JSON.stringify(data));
          // if (data.status == 'success'){
          //   this.checkLogin();
          // }else {
          //   alert('Something wrong');
          // }
          this.navCtrl.setRoot(TabsPage);
        },error=> {
          this.navCtrl.setRoot(TabsPage);
          // alert(JSON.stringify(error));
          // alert('Server not responding');
        });
    }
    console.log(this.productData);
  }
  capturePhoto() {
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
      this.productData.image = base64Image;
      this.imageSelected = true;
    }, (err) => {
      alert('Poster not selected')
      // Handle error
    });
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera,public global: GlobalProvider,public httpClient: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

}
