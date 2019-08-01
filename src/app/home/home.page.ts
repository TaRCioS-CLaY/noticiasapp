import { Component, ViewChild } from '@angular/core';
import { ApiService} from '../api.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonContent, {static: false}) content: IonContent;
  
  constructor(private apiService: ApiService) {}
  articles;
  ionViewDidEnter(){
    this.apiService.getTopNews().subscribe((data)=>{
      this.articles = data['articles'];
    })
  }
  ScrollToTop(){
    this.content.scrollToTop(1500);
  }
}
