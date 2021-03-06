import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService} from '../api.service';
import { IonContent } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { loadingController } from '@ionic/core';
import { localStorageService } from '../localStorage.service';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.page.html',
  styleUrls: ['./filmes.page.scss'],
})
export class FilmesPage implements OnInit {
  
  @ViewChild(IonContent, {static: false}) content: IonContent;

  constructor(private apiService: ApiService, private statusBar: StatusBar, private localDB: localStorageService) {}
  
  articles;
  carregando = true;
  pagina = 1;
  async ngOnInit() {
this.statusBar.overlaysWebView(true);
this.statusBar.backgroundColorByHexString('#3880ff');

const loading = await loadingController.create({
  message: 'Carregando',
});

if(!await this.localDB.get('filmes')){
  if(this.carregando){
    loading.present();
  }
  this.apiService.getFilmesNews().subscribe((data)=>{
    next: this.articles = data['articles'];
    
  },null,() => {
    loading.dismiss();
    this.localDB.set('filmes', this.articles);
  })
  this.carregando = false;
} else {
  this.articles = await this.localDB.get('filmes');
}
  }

  ScrollToTop(){
    this.content.scrollToTop(1500);
  }
  doRefresh(event) {
    this.apiService.getFilmesNews().subscribe((data)=>{
      this.articles = data['articles'];
    },null,() => {
      this.localDB.set('filmes', this.articles);
      event.target.complete();
    });
  }

  
  carregarMaisNoticias(event) {
    this.localDB.get('filmes').then((data) =>{
      this.articles = data;
    });
    console.log('artigos do banco: ', this.articles);

    this.apiService.getFilmesNews(this.pagina++).subscribe((data)=>{
      console.log('Artigos da consulta:', data['articles']);
      data['articles'].forEach(article => {
        this.articles.push(article);
      });
      console.log('Final: ',this.articles);
    },null,() => {
      this.localDB.set('filmes', this.articles);
      event.target.complete();
    });
}
}
