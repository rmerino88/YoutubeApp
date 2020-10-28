import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'youtubeDate'
})
export class YoutubeDatePipe implements PipeTransform {

  transform(date: Date, ...args: any[]): any {
    return 'prueba';
  }

}
