import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Crew, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  @Input() id;
  oculto = 150;
  slideOptPoster = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };
  Favorito = 'star-outline';

  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController,
              private dataLocal: DataLocalService) { }

  async ngOnInit() {

    const existe = await this.dataLocal.existePelicula( this.id ).then( ex => {
      this.Favorito = (ex ) ? 'star' : 'star-outline';
    });

    this.moviesService.getPeliculaDetalle( this.id )
                      .subscribe( resp => {
                        resp.backdrop_path = (resp.backdrop_path === null) ? './assets/no-image-banner.jpg' : resp.backdrop_path;
                        this.pelicula = resp;

                      });
    this.moviesService.getActores( this.id )
                      .subscribe( resp => {
                        this.actores.push( ...resp.cast );
                      });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  async favorito( ) {
     const existe = this.dataLocal.guardarPelicula( this.pelicula );

     this.Favorito = (existe === true) ? 'star' : 'star-outline';
  }
}
