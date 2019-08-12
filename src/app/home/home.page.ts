import { Component, ViewChild } from '@angular/core';
import { ApiService} from '../api.service';
import { IonContent } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoadingController } from '@ionic/angular';
import { loadingController } from '@ionic/core';
import { localStorageService } from '../localStorage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonContent, {static: false}) content: IonContent;
  
  constructor(private apiService: ApiService, private statusBar: StatusBar, loadingController: LoadingController, private localDB: localStorageService) {}
  articles;
  carregando = true;
  async ionViewDidEnter(){

    const loading = await loadingController.create({
      message: 'Carregando',
    });

    this.statusBar.overlaysWebView(true);
    if(!await this.localDB.get('topBombando')){
      if(this.carregando){
        loading.present();
      }
      this.apiService.getTopNews().subscribe((data)=>{
        next: this.articles = data['articles'];
        
      },null,() => {
        loading.dismiss();
        this.localDB.set('topBombando', this.articles);
      })
      this.carregando = false;
    } else {
      this.articles = await this.localDB.get('topBombando');
    }

  }
  ScrollToTop(){
    this.content.scrollToTop(1500);
  }
  doRefresh(event) {
    this.apiService.getTopNews().subscribe((data)=>{
      this.articles = data['articles'];
    },null,() => event.target.complete());
  }
}
