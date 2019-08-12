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

  getTopNews(){
    let headers = new HttpHeaders().set('authorization', 'Bearer ' + this.API_KEY);
    return this.httpClient.get(this.baseUrl + 'top-headlines?country=br', {headers: this.headers});
  }
  getJogosNews(){
    let headers = new HttpHeaders().set('authorization', 'Bearer ' + this.API_KEY);
    return this.httpClient.get(this.baseUrl +'everything?q=game OR jogo&language=pt', {headers: this.headers});
  }
  getFilmesNews(){
    let headers = new HttpHeaders().set('authorization', 'Bearer ' + this.API_KEY);
    return this.httpClient.get(this.baseUrl +'everything?q=cine OR filme OR serie OR seriado&language=pt&sortBy=publishedAt', {headers: this.headers});
  }

}
