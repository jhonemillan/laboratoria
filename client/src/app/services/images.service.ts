import { Http, Headers } from '@angular/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ImagesService {
  private query: string;
  public API_KEY: string = environment.PIXABAY_API_KEY;
  private API_URL: string = environment.PIXABAY_API_URL;
  private URL: string = this.API_URL + this.API_KEY + '&q=';
  private perPage = "&per_page=42&page=";
  private pag: string = "&page=";
  constructor(private http: Http) { }

  getImages(query, page: number){
    //const pagination = this.pag + page.toString();
    console.log('pagination is ' );
    console.log('la pagina es ' + page) ; 
    return this.http.get(this.URL + query + this.perPage + page).map(res => res.json());
  }

}
