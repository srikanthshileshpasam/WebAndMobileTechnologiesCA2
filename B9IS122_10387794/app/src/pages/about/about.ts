import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GlobalProvider} from "../../providers/global/global";
import {HttpClient} from "@angular/common/http";
import {EditPage} from "../edit/edit";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  edit() {
    this.navCtrl.push(EditPage)
  }
  imageUrl(url) {
    let finalUrl = this.global.domain + 'public/' + url;
    return finalUrl;
  }
  constructor(public navCtrl: NavController,public global: GlobalProvider) {

  }

}
