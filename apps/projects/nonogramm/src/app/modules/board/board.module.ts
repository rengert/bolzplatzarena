import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { BlockComponent } from './components/board/block/block.component';


@NgModule({
  declarations: [BoardComponent, BlockComponent],
  exports: [
    BoardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BoardModule {
}
