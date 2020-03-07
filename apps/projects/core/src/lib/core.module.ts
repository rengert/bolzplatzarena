import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from './modules/button/button.module';
import { MaterialModule } from './modules/material/material.module';
import { PrivacyModule } from './modules/privacy/privacy.module';
import { TrackByCoordPipe } from './pipes/track-by-coord.pipe';
import { TrackByPropertyPipe } from './pipes/track-by-property.pipe';

@NgModule({
  declarations: [TrackByPropertyPipe, TrackByCoordPipe],
  imports: [
    ButtonModule,
    CommonModule,
    MaterialModule,
    PrivacyModule,
  ],
  exports: [TrackByPropertyPipe, TrackByCoordPipe, MaterialModule, ButtonModule],
})
export class CoreModule {
}
