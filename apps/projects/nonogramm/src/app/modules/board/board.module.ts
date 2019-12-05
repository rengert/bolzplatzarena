import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { BlockComponent } from './components/board/block/block.component';
import { CaptionComponent } from './components/board/caption/caption.component';
import { CoreModule } from '../../../../../core/src/lib/core.module';


@NgModule({
  declarations: [BoardComponent, BlockComponent, CaptionComponent],
  exports: [
    BoardComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
  ]
})
export class BoardModule {
}
