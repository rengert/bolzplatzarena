import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { IconCardComponent } from './components/icon-card/icon-card.component';
import { IndicatorModule } from './modules/indicator/indicator.module';
import { MaterialModule } from './modules/material/material.module';
import { PrivacyModule } from './modules/privacy/privacy.module';
import { AgePipe } from './pipes/age.pipe';
import { DistancePipe } from './pipes/distance.pipe';
import { TrackByCoordPipe } from './pipes/track-by-coord.pipe';
import { TrackByPropertyPipe } from './pipes/track-by-property.pipe';

@NgModule({
  declarations: [TrackByPropertyPipe, TrackByCoordPipe, DistancePipe, AgePipe, IconCardComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    IndicatorModule,
    MaterialModule,
    PrivacyModule,
    RouterModule,
  ],
  exports: [
    AgePipe,
    DistancePipe,
    IconCardComponent,
    IndicatorModule,
    PrivacyModule,
    TrackByPropertyPipe,
    TrackByCoordPipe,
    MaterialModule,
  ],
})
export class CoreModule {
}
