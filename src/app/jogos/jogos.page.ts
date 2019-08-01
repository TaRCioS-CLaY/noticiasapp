import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService} from '../api.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-jogos',
  templateUrl: './jogos.page.html',
  styleUrls: ['./jogos.page.scss'],
})
export class JogosPage implements OnInit {

  @ViewChild(IonContent, {static: false}) content: IonContent;

  constructor(private apiService: ApiService) {}
  articles;
  ngOnInit() {
    this.apiService.getJogosNews().subscribe((data)=>{
      this.articles = data['articles'];
    })
  }

  ScrollToTop(){
    this.content.scrollToTop(1500);
  }
  
}
