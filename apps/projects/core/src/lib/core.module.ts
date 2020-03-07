import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';
import { PrivacyModule } from './modules/privacy/privacy.module';
import { TrackByCoordPipe } from './pipes/track-by-coord.pipe';
import { TrackByPropertyPipe } from './pipes/track-by-property.pipe';

@NgModule({
  declarations: [TrackByPropertyPipe, TrackByCoordPipe],
  imports: [
    CommonModule,
    MaterialModule,
    PrivacyModule,
  ],
  exports: [TrackByPropertyPipe, TrackByCoordPipe, MaterialModule],
})
export class CoreModule {
}
