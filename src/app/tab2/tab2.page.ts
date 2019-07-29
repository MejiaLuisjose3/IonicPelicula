import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  textoBuscar: string;
  ideas: string[] = ['Avengers', 'Spiderman', 'El señor de los anillos'];
  pelicula: Pelicula[] = [];
  buscando = false;

  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController) {}

  Buscar( event ) {
    const valor = event.detail.value;
    if (valor.length !== 0) {
      this.buscando = true;
      this.moviesService.getPelicula( valor ).subscribe( resp => {
        // tslint:disable-next-line:no-string-literal
        this.pelicula = resp['results'];
        this.buscando = false;
      });
    } else {
      this.pelicula = [];
      this.buscando = false;
    }
  }

  async verDetalle(id: string) {
    const valor = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    valor.present();
  }
}
