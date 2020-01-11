import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { BoardModule } from '../board/board.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [GameComponent],
  imports: [
    BoardModule,
    CommonModule,
    MatButtonModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    GameComponent,
  ]
})
export class GameModule {
}
