import { NgModule } from '@angular/core';
import { JoinPipe } from './pipes/join.pipe';


@NgModule({
  declarations: [JoinPipe],
  imports: [],
  exports: [JoinPipe]
})
export class CoreModule {
}
