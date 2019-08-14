import { Component, ViewChild } from '@angular/core';
import { ApiService} from '../api.service';
import { IonContent } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
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
  @ViewChild(IonInfiniteScroll,{static: false}) infiniteScroll: IonInfiniteScroll;

  constructor(private apiService: ApiService, private statusBar: StatusBar, loadingController: LoadingController, private localDB: localStorageService) {}
  articles;
  carregando = true;
  temporario;
  async ionViewDidEnter(){

    const loading = await loadingController.create({
      message: 'Carregando',
    });

    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#3880ff');
    if(!await this.localDB.get('topBombando')){
      if(this.carregando){
        loading.present();
      }
      this.apiService.getTopNews().subscribe((data)=>{
      this.articles = data['articles'];  
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
    this.localDB.clear();
    this.apiService.getTopNews().subscribe((data)=>{
      this.articles = data['articles'];
    },null,() => {
      this.localDB.set('topBombando', this.articles);
      event.target.complete();
    });
  }

  carregarMaisNoticias(event) {
      this.localDB.get('topBombando').then((data) =>{
        this.articles = data;
      });
      console.log('artigos do banco: ', this.articles);

      this.apiService.getTopNews(2).subscribe((data)=>{
        console.log('Artigos da consulta:', data['articles']);
        data['articles'].forEach(article => {
          this.articles.push(article);
        });
        console.log('Final: ',this.articles);
      },null,() => {
        this.localDB.set('topBombando', this.articles);
        event.target.disabled = true;
        event.target.complete();
      });
  }
}
