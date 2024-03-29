import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { IconCardComponent } from './components/icon-card/icon-card.component';
import { IndicatorModule } from './modules/indicator/indicator.module';
import { PrivacyModule } from './modules/privacy/privacy.module';
import { AgePipe } from './pipes/age.pipe';
import { DistancePipe } from './pipes/distance.pipe';
import { TrackByCoordPipe } from './pipes/track-by-coord.pipe';
import { TrackByPropertyPipe } from './pipes/track-by-property.pipe';

@NgModule({
  declarations: [TrackByCoordPipe, DistancePipe, AgePipe, IconCardComponent],
  imports: [
    CommonModule,
    IndicatorModule,
    PrivacyModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    TrackByPropertyPipe,
  ],
  exports: [
    AgePipe,
    DistancePipe,
    IconCardComponent,
    IndicatorModule,
    PrivacyModule,
    TrackByPropertyPipe,
    TrackByCoordPipe,
  ],
})
export class CoreModule {
}
