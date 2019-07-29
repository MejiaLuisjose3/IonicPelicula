import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, GetCredits, Genre } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private pupularesPage = 1;
  generos: Genre[] = [];
  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>( query: string ) {
    query = URL + query;
    query += `&api_key=${ apiKey }&language=es&include_image_langueage=es`;

    return this.http.get<T>( query );
  }

    getFeature() {
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;

    let mesString;

    if ( mes < 10 ) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
    const fin = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;


    // tslint:disable-next-line:max-line-length
    return this.ejecutarQuery<RespuestaMDB>( `/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }` );
  }

    getPopulares() {

      this.pupularesPage++;

      const query = `/discover/movie?sort_by=popularity.desc&page=${ this.pupularesPage }`;

      return this.ejecutarQuery<RespuestaMDB>(query);
    }

    getPeliculaDetalle( id: string) {

      return this.ejecutarQuery<PeliculaDetalle>(`/movie/${ id }?a=1`);
    }

    getActores( id: string ) {

      return this.ejecutarQuery<GetCredits>(`/movie/${ id }/credits?a=1`);

    }

    getPelicula(titulo: string) {

      return this.ejecutarQuery( `/search/movie?query=${ titulo }` );
    }

    cargarGeneros(): Promise<Genre[]> {
      return new Promise( resolver => {

        this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe( resp => {
          // tslint:disable-next-line:no-string-literal
          this.generos = resp['genres'];
          console.log( this.generos );
          resolver(this.generos);
        });
      });
    }
}
