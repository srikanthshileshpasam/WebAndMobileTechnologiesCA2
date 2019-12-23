import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalProvider} from "../../providers/global/global";
import {HttpClient} from "@angular/common/http";
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../login/login";

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  data:any;
  orders:any = [];
  getOrders() {
    this.data = this.httpClient.get(this.global.apiUrl + 'orders');
    this.data
      .subscribe(data => {
        this.orders = data;
        console.log(data)
      },error=> {
        alert('Server not responding');
      });
  }
  mark(id,status){
    this.data = this.httpClient.post(this.global.apiUrl + 'orders/mark' , {id:id, status:status});
    this.data
      .subscribe(data => {
        if (data == 'success') this.getOrders();
        console.log(data)
      },error=> {
        alert('Server not responding');
      });
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public global: GlobalProvider,public httpClient: HttpClient) {
    this.getOrders();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

}
