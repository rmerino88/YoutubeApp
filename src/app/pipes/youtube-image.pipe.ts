import { Pipe, PipeTransform } from '@angular/core';
import { Thumbnails } from '../models/youtube.models';

@Pipe({
  name: 'youtubeImage'
})
export class YoutubeImagePipe implements PipeTransform {

  transform(thumbnails: Thumbnails, ...args: any[]): string {
    // Esa funcionalidad de window nos dice el ancho de pantalla
    // console.log('Width: ' + window.innerWidth);
    if(window.innerWidth>1200 && thumbnails.maxres!=null){
      return thumbnails.maxres.url;
    } else if(window.innerWidth>600 && thumbnails.high!=null){
      return thumbnails.high.url;
    } else {
      return thumbnails.medium.url;
    }
  }

}
