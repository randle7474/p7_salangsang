import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { Splashscreen } from "ionic-native";
import { StatusBar } from "ionic-native";
import firebase from 'firebase';

import { ListPage } from "../pages/list/list";
import { DetailPage } from "../pages/detail/detail"
import { HomePage } from "../pages/home/home";
import { AuthService } from "../services/auth";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  signinPage = HomePage;
  signupPage = ListPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform,
              private menuCtrl: MenuController,
              private authService: AuthService) {
    firebase.initializeApp ({
      apiKey: "AIzaSyAFeY_prD7aVyIT5iTPCnjtusU_kYBbtgk",
      authDomain: "myfirstproject-875fd.firebaseapp.com",
       });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = DetailPage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = ListPage;
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
        });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(HomePage);
  }
}

