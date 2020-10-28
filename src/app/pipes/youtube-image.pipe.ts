import { Pipe, PipeTransform } from '@angular/core';
import { Thumbnails } from '../models/youtube.models';

@Pipe({
  name: 'youtubeImage'
})
export class YoutubeImagePipe implements PipeTransform {

  transform(thumbnails: Thumbnails, ...args: any[]): string {
    // TODO : Hacer esta decision en función de la resulucion de la pantalla 
    return thumbnails.medium.url;
  }

}
