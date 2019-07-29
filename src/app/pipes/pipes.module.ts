import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';
import { FiltroImagenesPipe } from './filtro-imagenes.pipe';

@NgModule({
  declarations: [
    ImagenPipe,
    ParesPipe,
    FiltroImagenesPipe
  ],
  exports: [
    ImagenPipe,
    ParesPipe,
    FiltroImagenesPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
