import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'LDX5qwxCJ3faybVEgUFsR9kF7bfl8n6s';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  //GETTERS

  get tagsHistory(): string[] {
    return [ ...this._tagsHistory ];
  }

  //METHODS

  private saveLocalStorage(): void {
    localStorage.setItem("history", JSON.stringify(this.tagsHistory))
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    this.addTag(this._tagsHistory[0]);
  }

  private organizeHistory( tag: string ): void {
    this.removeTag(tag)

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.splice(0, 10);

    this.saveLocalStorage();
  }

  addTag( tag: string ):void {
    if ( !tag ) return;

    this.organizeHistory( tag );

    const params = new HttpParams()
      .set( 'api_key', this.apiKey )
      .set( 'limit', '10' )
      .set( 'q', tag );

    this.http.get<SearchResponse>( `${ this.serviceUrl }/search`, { params } )
      .subscribe ( resp => {

        this.gifList = resp.data;

      });
  }

  removeTag(tag: string) {
    tag = tag.toLowerCase();

    if ( this._tagsHistory.includes( tag ) ) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag ) => oldTag !== tag );
    }

    if (this._tagsHistory.length === 0) this.gifList = [];

    this.saveLocalStorage();
  }

  infinite(tag: string):void {
    const params = new HttpParams()
      .set( 'api_key', this.apiKey )
      .set( 'limit', '10' )
      .set( 'q', tag );

    this.http.get<SearchResponse>( `${ this.serviceUrl }/search`, { params } )
      .subscribe ( resp => {
        this.gifList.concat(resp.data);
      });
  }
}
