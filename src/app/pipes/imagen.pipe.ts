import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, size: string = 'w500'): any {

    if ( imagen === null || imagen === './assets/no-image-banner.jpg') {
      return './assets/no-image-banner.jpg';
    }
    const imgUrl = `${ URL }/${ size }${ imagen }`;
    return imgUrl;
  }

}
