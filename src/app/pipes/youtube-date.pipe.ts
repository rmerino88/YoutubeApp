import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'youtubeDate'
})
export class YoutubeDatePipe implements PipeTransform {

  transform(date: Date, ...args: any[]): string {
    // Ya existe un datepie propio de angular que merece la pena ser usado
    return `${date} *Piped`;
  }

}
