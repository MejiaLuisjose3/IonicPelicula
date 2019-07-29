import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController, Platform } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];

  slideOpts = {
  };

  constructor( private modelCtrl: ModalController,
               private slide: Platform ) { }

  ngOnInit() {
    if (this.slide.is('mobile')) {
      this.slideOpts = {
        slidesPerView: 1.1,
        freeMode: true
      };
    } else {
      this.slideOpts = {
        slidesPerView: 3.1,
        freeMode: true
      };
    }
  }

  async Detalle(id: string) {
      // console.log(pelicula);
      const modal = await this.modelCtrl.create({
        component: DetalleComponent,
        componentProps: {
          id
        }
      });
      modal.present();
  }
}
