import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';
import { PrivacyModule } from './modules/privacy/privacy.module';
import { DistancePipe } from './pipes/distance.pipe';
import { TrackByCoordPipe } from './pipes/track-by-coord.pipe';
import { TrackByPropertyPipe } from './pipes/track-by-property.pipe';

@NgModule({
  declarations: [TrackByPropertyPipe, TrackByCoordPipe, DistancePipe],
  imports: [
    CommonModule,
    MaterialModule,
    PrivacyModule,
  ],
  exports: [DistancePipe, TrackByPropertyPipe, TrackByCoordPipe, MaterialModule],
})
export class CoreModule {
}
