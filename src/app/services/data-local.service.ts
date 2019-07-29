import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Pelicula, PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  pelicula: PeliculaDetalle[] = [];
  constructor(private storage: Storage,
              private toastCtrl: ToastController) { }

  guardarPelicula(pelicula: PeliculaDetalle) {

    let existe = false;
    let mensaje = '';

    for (const peli of this.pelicula) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if ( existe ) {
      this.pelicula = this.pelicula.filter(peli => peli.id !== pelicula.id);
      mensaje = 'Removido de Favorito';
    } else {
      this.pelicula.push( pelicula );
      mensaje = 'Agregada a Favorito';
    }

    this.storage.set('peliculas', this.pelicula).then(() => {
      this.presentToast(mensaje);
    });

    return !existe;
  }

  async presentToast(texto: string) {
    const toast = await this.toastCtrl.create({
      message: texto,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  async cargarFavorito() {
    const pelicula = await this.storage.get('peliculas');
    this.pelicula = pelicula || [];
    return this.pelicula;
  }

  async existePelicula(id) {
    const a = Number(id);
    await this.cargarFavorito();

    const existe = this.pelicula.filter( peli => peli.id === a);

    return (existe.length > 0) ? true : false;
  }
}
