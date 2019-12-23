import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import {GlobalProvider} from "../../providers/global/global";
import {AddProductPage} from "../add-product/add-product";
import {HttpClient} from "@angular/common/http";
import {TabsPage} from "../tabs/tabs";
import {Storage} from "@ionic/storage";
import {LoginPage} from "../login/login";
import {CartPage} from "../cart/cart";
import {OrdersPage} from "../orders/orders";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  openOrders() {
    this.navCtrl.push(OrdersPage)
  }
  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp);
      alert(JSON.stringify(resp.coords.latitude))
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  getContact() {
    this.contacts.pickContact().then((err) => {
      alert(JSON.stringify(err))
    }).catch((error) => {
      alert(JSON.stringify(error));
    });
  }
  addProduct() {
    this.navCtrl.push(AddProductPage);
  }
  data:any;
  products:any = [];
  imageUrl(url) {
    let finalUrl = this.global.domain + 'public/' + url;
    return finalUrl;
  }
  getProducts() {
      this.data = this.httpClient.get(this.global.apiUrl + 'products/list');
      this.data
        .subscribe(data => {
          console.log(data);
          this.products = data;
        },error=> {
          alert('Server not responding');
        });
  }
  cart:any = [];
  addToCart(id) {
    this.cart.push(id);
    console.log(this.cart);
    this.storage.set('cart', this.cart);
  }
  removeFromCart(id){
    let index = this.cart.findIndex(e => e.id === id);
    this.cart.splice(index, 1);
    console.log(this.cart);
    this.storage.set('cart', this.cart);
  }
  addToCartCheck(id){
    if((this.cart.find(e => e.id === id))){
      console.log(1);
      return false
    }
    else {
      console.log(2);
      return true
    }
  }
  getCart() {
    this.storage.get('cart').then((data)=>{
      if (data != null) {
        this.cart = data;
      }else {
      }
    });
  }
  searchText:any = '';
  search(){
    console.log(this.searchText);
    this.data = this.httpClient.get(this.global.apiUrl + 'products/list/search?search=' + this.searchText);
    this.data
      .subscribe(data => {
        console.log(data);
        this.products = data;
      },error=> {
        alert('Server not responding');
      });
  }
  openCartPage() {
    this.navCtrl.push(CartPage);
  }
  constructor(public navCtrl: NavController, private geolocation: Geolocation,private contacts: Contacts,private deviceOrientation: DeviceOrientation,
              public global: GlobalProvider,public httpClient: HttpClient,private storage: Storage) {
    // let contact: Contact = this.contacts.create();
    this.getProducts();
    this.getCart();
    // storage.remove('cart')
  }

}
