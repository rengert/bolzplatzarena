import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatisticsComponent} from './components/statistics/statistics.component';
import {SharedModule} from '../shared/shared.module';
import {MatTableModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    CdkTableModule,
    TranslateModule,
  ],
  declarations: [StatisticsComponent]
})
export class StatisticsModule {
}
