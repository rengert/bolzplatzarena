import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { StatisticsComponent } from './components/statistics/statistics.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    CdkTableModule,
    TranslateModule,
  ],
  declarations: [StatisticsComponent],
})
export class StatisticsModule {
}
