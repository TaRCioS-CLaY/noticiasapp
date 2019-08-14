import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
API_KEY ='f174c95242974ca49e0735c844422f61';
baseUrl = 'https://newsapi.org/v2/' ;
headers = new HttpHeaders().set('authorization', 'Bearer ' + this.API_KEY);
  news: any;

  constructor(private httpClient: HttpClient) { }

  getTopNews(page=1){
    let headers = new HttpHeaders().set('authorization', 'Bearer ' + this.API_KEY);
    return this.httpClient.get(this.baseUrl + 'top-headlines?country=br&page='+ page, {headers: this.headers});
  }
  getJogosNews(page=1){
    let headers = new HttpHeaders().set('authorization', 'Bearer ' + this.API_KEY);
    return this.httpClient.get(this.baseUrl +'everything?q=game OR jogo AND (sony OR microsoft OR nintendo OR ps3 OR ps4 OR ps2 OR xbox)&language=pt&sortBy=publishedAt&page='+ page, {headers: this.headers});
  }
  getFilmesNews(page=1){
    let headers = new HttpHeaders().set('authorization', 'Bearer ' + this.API_KEY);
    return this.httpClient.get(this.baseUrl +'everything?q=cine OR filme OR serie OR seriado OR animação OR netflix&language=pt&sortBy=publishedAt&page='+ page, {headers: this.headers});
  }

}
