import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10
  };

  constructor( private modelCtrl: ModalController ) { }

  ngOnInit() {}

  onClick() {
    this.cargarMas.emit();
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
