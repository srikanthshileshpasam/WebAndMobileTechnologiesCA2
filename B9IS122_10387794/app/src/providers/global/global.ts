import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
  apiUrl: any = '';
  loginStatus: boolean = false;
  loginData:any = '';
  domain:any = 'https://www.worldctalenthubb.com/web/s_s/';
  constructor(public http: HttpClient) {
    this.apiUrl = 'https://www.worldctalenthubb.com/web/s_s/public/index.php/api/';
    console.log('Hello GlobalProvider Provider');
  }

}
