import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalProvider} from "../../providers/global/global";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../login/login";
import {WelcomePage} from "../welcome/welcome";

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cart:any = [];
  getCart() {
    this.storage.get('cart').then((data)=>{
      if (data != null) {
        this.cart = data;
        console.log(this.cart);
      }
    });
  }
  imageUrl(url) {
    let finalUrl = this.global.domain + 'public/' + url;
    return finalUrl;
  }
  getPrice(): number {
    let count= 0;
    this.cart.forEach((item) => {
        count = count + item.price;
    });
    return count;
  }
  data:any;
  checkOut(){
    console.log(this.cart);
    let checkOutData = {cart:this.cart, totalPrices: this.getPrice()+5, id: 1};
    console.log(checkOutData);
    this.data = this.httpClient.post(this.global.apiUrl + 'order/checkout', checkOutData);
    this.data
      .subscribe(data => {
        if (data.status == 'success') {
          this.cart = [];
          this.storage.remove('cart');
          alert('Your product will be delivered to your location');
          this.navCtrl.setRoot(WelcomePage);
        }
        console.log(data);
      },error=> {
        alert('Server not responding');
      });
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public global: GlobalProvider,public httpClient: HttpClient,private storage: Storage) {
    this.getCart();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

}
