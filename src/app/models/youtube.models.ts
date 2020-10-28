// MUY UTIL!! Se han conseguido generar todos estos tipos colocando el json de respuesta en el siguiente site
// https://quicktype.io/

export interface YoutubeResponse {
    kind:          string;
    etag:          string;
    nextPageToken: string;
    items:         Item[];
    pageInfo:      PageInfo;
}

export interface Item {
    kind:    string;
    etag:    string;
    id:      string;
    snippet: Video;
}

export interface Video {
    publishedAt:  Date;
    channelId:    string;
    title:        string;
    description:  string;
    thumbnails:   Thumbnails;
    channelTitle: string;
    playlistId:   string;
    position:     number;
    resourceId:   ResourceID;
    thumbnailToShow: string;
}

export interface ResourceID {
    kind:    string;
    videoId: string;
}


export interface Thumbnails {
    default:  Thumbnail;
    medium:   Thumbnail;
    high:     Thumbnail;
    standard: Thumbnail;
    maxres?:  Thumbnail;
}

export interface Thumbnail {
    url:    string;
    width:  number;
    height: number;
}

export interface PageInfo {
    totalResults:   number;
    resultsPerPage: number;
}
