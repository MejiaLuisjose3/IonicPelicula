import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaDetalle[] = [];
  genero: Genre[] = [];
  favoritoGenero: any[] = [];

  constructor(private Data: DataLocalService,
              private moviesService: MoviesService) {}

  async ngOnInit()  {
  }

  async ionViewWillEnter() {
    this.peliculas = await this.Data.cargarFavorito();
    this.genero = await this.moviesService.cargarGeneros();
    this.PeliPorGenero(this.genero, this.peliculas);
  }

  PeliPorGenero(genero: Genre[], pelicula: PeliculaDetalle[]) {
    this.favoritoGenero = [];

    this.genero.forEach( gener => {
      this.favoritoGenero.push({
        genero: gener.name,
        pelis: pelicula.filter( peli => {
          return peli.genres.find(genre => genre.id === gener.id );
        } )
      });
    });
    console.log(this.favoritoGenero);

  }
}
