import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


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
    // console.log(this.getChannelInfo());
    console.log(this.getPlayListItems());    
  }
  
  getChannelInfo() {
    console.log('Entra al servicio getChannelInfo!!');
    const url = `${this.youTubeUrl}${this.channelsPath}`;
    const params = new HttpParams()
      .append('key', this.apiKey)
      .append('part', 'contentDetails')
      .append('id', this.channelId);
    // Este método devuelve un observable
    this.httpClient.get(url, {params}).subscribe(
      result => {
        // result.items.forEach( element => {
        //   console.log(element);
        // });
      });
    return 'Terminado';
  }
  /**
   * Recupera los videos del canal
   */
  getPlayListItems() {
    console.log('Entra al servicio getPlayListItems!!');
    const url = `${this.youTubeUrl}${this.playListItemsPath}`;
    // const params = new HttpParams()
    // .append('key', this.apiKey)
    // .append('part', 'snippet')
    // .append('playlistid', this.playListId)
    // .append('maxResults', '10');
    // Este método devuelve un observable
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('key', this.apiKey)
      .set('playlistid', this.playListId)
      .set('maxResults', '10');
    // Este método devuelve un observable
    this.httpClient.get(url, {params: params}).subscribe(
      (result: any) => {
        console.log(result);
        // result.items.forEach( element => {
        //   console.log(element);
        // });
      });
    return 'Terminado';
  }

}
