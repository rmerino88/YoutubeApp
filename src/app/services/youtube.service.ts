import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YoutubeResponse, Item } from '../models/youtube.models';
import { YoutubeImagePipe } from '../pipes/youtube-image.pipe';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private apiKey = 'AIzaSyBF11lZNkN4kHKeqgE7d-IhqK6196o_Ad8';
  private playListId = 'UUuaPTYj15JSkETGnEseaFFg';
  private channelId = 'UCuaPTYj15JSkETGnEseaFFg';

  private playListItemsPath = 'playlistItems';
  private channelsPath = 'channels';
  private nextPageToken = '';
  private youTubeUrl = 'https://www.googleapis.com/youtube/v3/';

  constructor(private httpClient: HttpClient) {
  }
  
  ngOnInit(): void {
  }

  /**
   * Recupera la información del canal
   */
  getChannelInfo() {
    console.log('Entra al servicio getChannelInfo!!');
    const url = `${this.youTubeUrl}${this.channelsPath}`;
    const params = new HttpParams()
      .append('key', this.apiKey)
      .append('part', 'contentDetails')
      .append('id', this.channelId);
    // Este método devuelve un observable
    this.httpClient.get(url, {params}).subscribe(
      (result : any) => {
        result.items.forEach( element => {
          console.log(element);
        });
      });
  }

  /**
   * Recupera los videos del canal --> Devuelve un observable
   */
  getPlayListItems() {

    const url = `${this.youTubeUrl}${this.playListItemsPath}`;

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('key', this.apiKey)
      .set('playlistId', this.playListId)
      .set('maxResults', '10');

    // Se decide devolver el observable al componente
    return this.httpClient.get<YoutubeResponse>(url, {params: params});
  }

  /**
   * Recupera toda la respuesta del servicio --> Devuelve un observable
   */
  getPlayListItemsOther() {

    const url = `${this.youTubeUrl}${this.playListItemsPath}`;

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('key', this.apiKey)
      .set('playlistId', this.playListId)
      .set('maxResults', '10')
      .set('pageToken', this.nextPageToken);
      
    // Este método sigue devolviendo un observable
    // Parece que el segundo map, actúa sobre el resultado del primero
    // En el primero la respuesta es Item[]
    // En el segundo la respuesta es Video[]
    return this.httpClient.get<YoutubeResponse>(url, {params: params})
      .pipe(
        map( resp => {
          this.nextPageToken = resp.nextPageToken;
          return resp.items;
        }),
        map( items =>{
          // 1. Formatear la fecha
          // 2. Seleccionar una imagen por defecto
          return items.map( video => video.snippet );
        })
      );
  }

  /**
   * Recupera toda la respuesta del servicio --> Devuelve toda la respuesta
   * NO LO HE CONSEGUIDO!
   */
  getPlayListResponseNoObs() {

    const url = `${this.youTubeUrl}${this.playListItemsPath}`;

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('key', this.apiKey)
      .set('playlistId', this.playListId)
      .set('maxResults', '10');
    
    // Este método devuelve un observable
    // return this.httpClient.get(url, {params: params}).subscribe(
    //   (result: YoutubeResponse) => {
    //     return result;
    //   });
        
    // Este método devuelve un observable
    // return this.httpClient.get(url, {params: params}).pipe(
      //   map((resp: YoutubeResponse) => {
        //     return resp;
        //   })
        // );
        
    // Este métodosigue devolviendo un observable
    return this.httpClient.get<YoutubeResponse>(url, {params: params})
      .pipe(
        map((resp: YoutubeResponse) => {
          this.nextPageToken = resp.nextPageToken;
          return resp.items;
        })
      );
  }

  /**
   * Recupera los videos del canal --> Devuelve la lista de los elementos directamente
   */
  getPlayListItemsNoObs() {

    const url = `${this.youTubeUrl}${this.playListItemsPath}`;
   
    // Otra manera de crear los params
    // const params = new HttpParams()
    // .append('key', this.apiKey)
    // .append('part', 'snippet')
    // .append('playlistid', this.playListId)
    // .append('maxResults', '10');

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('key', this.apiKey)
      .set('playlistId', this.playListId)
      .set('maxResults', '10');
    
    // Este método devuelve un observable
    // Lo que se hace es una chorrada, solo para practicar
    const itemList : Item[] = [];
    this.httpClient.get(url, {params: params}).subscribe(
      (result: any) => {
        result.items.forEach( (item : Item) => {
          itemList.push(item);
        });
      });
    return itemList; 
  }

}
