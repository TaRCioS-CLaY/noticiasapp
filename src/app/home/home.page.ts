import { Component, ViewChild } from '@angular/core';
import { ApiService} from '../api.service';
import { IonContent } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonContent, {static: false}) content: IonContent;
  
  constructor(private apiService: ApiService, private statusBar: StatusBar) {}
  articles;
  ionViewDidEnter(){
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#ffffff');
    this.apiService.getTopNews().subscribe((data)=>{
      this.articles = data['articles'];
    })
  }
  ScrollToTop(){
    this.content.scrollToTop(1500);
  }
  doRefresh(event) {
    this.ionViewDidEnter();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
