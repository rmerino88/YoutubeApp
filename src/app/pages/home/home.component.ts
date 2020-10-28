import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Video } from 'src/app/models/youtube.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  videos : Video[] = [];

  constructor(private youtubeService: YoutubeService ) { }

  ngOnInit() {
    console.log('Iniciamos el componente home!');
    
    console.log('Devolvemos un observable al componente.');
    this.youtubeService.getPlayListItems().subscribe( resp => {
      console.log(resp);
    });

    console.log('Otra manera, devolvemos un observable al componente pero con objetos ya tratados.');
    this.youtubeService.getPlayListItemsOther().subscribe( resp => {
      console.log(resp);
      this.videos = resp;
    });
   
    console.log('Otra manera, devolvemos una lista de objetos al componente.');
    console.log(this.youtubeService.getPlayListItemsNoObs());
   
    // console.log('Otra manera, devolvemos toda la respuesta del servicio al componente, en forma de objeto');
    // console.log(this.youtubeService.getPlayListResponseNoObs());
  }

}
