import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  peliculasReciente: Pelicula[] = [];
  populares: Pelicula[] = [];

  slideOpts = {
    slidesPerView: 1.1,
    freeMode: true
  };

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getFeature().subscribe( resp => {
      this.peliculasReciente = resp.results;
    });

    this.getPopulares();
  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopulares().subscribe( resp => {
      // console.log('populaeres', resp);
      const arrTemp = [...this.populares, ...resp.results ];
      this.populares = arrTemp;

    });
  }

}
