import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrackByCoordPipe } from './pipes/track-by-coord.pipe';
import { TrackByPropertyPipe } from './pipes/track-by-property.pipe';

@NgModule({
  declarations: [TrackByPropertyPipe, TrackByCoordPipe],
  imports: [
    CommonModule,
  ],
  exports: [TrackByPropertyPipe, TrackByCoordPipe],
})
export class CoreModule {
}
