import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CountDownComponent } from './components/count-down/count-down.component';

@NgModule({
  declarations: [CountDownComponent],
  exports: [
    CountDownComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class IndicatorModule {
}
