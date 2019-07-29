import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { ModalController, Platform } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];

  dispositivo = false;
  slideOpts = {
    slidesPerView: 2.9,
    freeMode: true
  };

  constructor( private modelCtrl: ModalController,
               private platform: Platform ) { }

  ngOnInit() {
    this.dispositivo = (this.platform.is('mobile') === true) ? true : false;

  }

  async Detalle(id: string) {
    const modal = await this.modelCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
}
}
