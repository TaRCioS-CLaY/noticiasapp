import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService} from '../api.service';
import { IonContent } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { loadingController } from '@ionic/core';
import { localStorageService } from '../localStorage.service';

@Component({
  selector: 'app-jogos',
  templateUrl: './jogos.page.html',
  styleUrls: ['./jogos.page.scss'],
})
export class JogosPage implements OnInit {

  @ViewChild(IonContent, {static: false}) content: IonContent;

  constructor(private apiService: ApiService, private statusBar: StatusBar, private localDB: localStorageService) {}
  
  articles;
  carregando = true;
  async ngOnInit() {
    this.statusBar.overlaysWebView(true);

    const loading = await loadingController.create({
      message: 'Carregando',
    });
    
    if(!await this.localDB.get('jogos')){
      if(this.carregando){
        loading.present();
      }
      this.apiService.getJogosNews().subscribe((data)=>{
        next: this.articles = data['articles'];
        
      },null,() => {
        loading.dismiss();
        this.localDB.set('jogos', this.articles);
      })
      this.carregando = false;
    } else {
      this.articles = await this.localDB.get('jogos');
    }
  }

  ScrollToTop(){
    this.content.scrollToTop(1500);
  }
  doRefresh(event) {
    this.apiService.getJogosNews().subscribe((data)=>{
      this.articles = data['articles'];
    },null,() => event.target.complete());
  }
}
