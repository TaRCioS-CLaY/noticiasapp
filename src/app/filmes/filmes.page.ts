import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService} from '../api.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.page.html',
  styleUrls: ['./filmes.page.scss'],
})
export class FilmesPage implements OnInit {
  
  @ViewChild(IonContent, {static: false}) content: IonContent;

  constructor(private apiService: ApiService) {}
  articles;
  ngOnInit() {
    this.apiService.getFilmesNews().subscribe((data)=>{
      this.articles = data['articles'];
    })
  }

  ScrollToTop(){
    this.content.scrollToTop(1500);
  }
  
}
