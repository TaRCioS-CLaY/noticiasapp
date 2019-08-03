import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService} from '../api.service';
import { IonContent } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-jogos',
  templateUrl: './jogos.page.html',
  styleUrls: ['./jogos.page.scss'],
})
export class JogosPage implements OnInit {

  @ViewChild(IonContent, {static: false}) content: IonContent;

  constructor(private apiService: ApiService, private statusBar: StatusBar) {}
  
  articles;
  ngOnInit() {
this.statusBar.overlaysWebView(true);
this.statusBar.backgroundColorByHexString('#ffffff');

    this.apiService.getJogosNews().subscribe((data)=>{
      this.articles = data['articles'];
    })
  }

  ScrollToTop(){
    this.content.scrollToTop(1500);
  }
  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
