import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Video } from 'src/app/models/youtube.models';
import Swal from 'sweetalert2';

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
    
    // console.log('Devolvemos un observable al componente.');
    // this.youtubeService.getPlayListItems().subscribe( resp => {
    //   console.log(resp);
    // });

    // console.log('Otra manera, devolvemos un observable al componente pero con objetos ya tratados.');
    // this.youtubeService.getPlayListItemsOther().subscribe( resp => {
    //   console.log(resp);
    //   // Si ahcemos esto se machacaran los elementos de videos
    //   // this.videos = resp;
    //   // Nosotros queremos que se añadan a los videos ya existentes
    //   this.videos.push( ...resp );
    // });
   
    // console.log('Otra manera, devolvemos una lista de objetos al componente.');
    // console.log(this.youtubeService.getPlayListItemsNoObs());
   
    // console.log('Otra manera, devolvemos toda la respuesta del servicio al componente, en forma de objeto');
    // console.log(this.youtubeService.getPlayListResponseNoObs());

    this.cargarVideos();
  }

  cargarVideos(){
    console.log('Otra manera, devolvemos un observable al componente pero con objetos ya tratados.');
    this.youtubeService.getPlayListItemsOther().subscribe( resp => {
      console.log(resp);
      // Si ahcemos esto se machacaran los elementos de videos
      // this.videos = resp;
      // Nosotros queremos que se añadan a los videos ya existentes
      this.videos.push( ...resp );
    });
  }
  
  mostrarVideo( video: Video ){
    const iframe = 
      `<h4>${video.title}</h4>
      <iframe width="100%" height="315" src="https://www.youtube.com/embed/${video.resourceId.videoId}" frameborder="0" allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture" allowfullscreen>
      </iframe>`;
    Swal.fire({
      html: iframe
    });
  }

}
