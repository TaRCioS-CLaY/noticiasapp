import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Bombando',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Jogos',
      url: '/jogos',
      icon: 'logo-game-controller-a'
    },
    {
      title: 'Filmes',
      url: '/filmes',
      icon: 'videocam'
    },
    {
      title: 'Sobre',
      url: '/about',
      icon: 'help-circle-outline'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
