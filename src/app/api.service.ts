import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
API_KEY ='f174c95242974ca49e0735c844422f61';

  constructor(private httpClient: HttpClient) { }
  getTopNews(){
    let headers = new HttpHeaders().set('authorization', 'Bearer ' + this.API_KEY);
    return this.httpClient.get('https://newsapi.org/v2/top-headlines?country=br', {headers: headers});
  }
  getJogosNews(){
    let headers = new HttpHeaders().set('authorization', 'Bearer ' + this.API_KEY);
    return this.httpClient.get('https://newsapi.org/v2/everything?q=jogos', {headers: headers});
  }
  getFilmesNews(){
    let headers = new HttpHeaders().set('authorization', 'Bearer ' + this.API_KEY);
    return this.httpClient.get('https://newsapi.org/v2/everything?q=cinema AND filme', {headers: headers});
  }

}
