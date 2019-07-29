import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroImagenes'
})
export class FiltroImagenesPipe implements PipeTransform {

  transform(peliculas: any[], args?: any): any[] {

    return peliculas.filter( peli => {
      return peli.backdrop_path;
    });
  }

}
