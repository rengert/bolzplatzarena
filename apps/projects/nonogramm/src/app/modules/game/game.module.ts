import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { BoardModule } from '../board/board.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { LoseScreenComponent } from './components/lose-screen/lose-screen.component';
import { WinScreenComponent } from './components/win-screen/win-screen.component';


@NgModule({
  declarations: [
    GameComponent,
    LoseScreenComponent,
    WinScreenComponent,
  ],
  imports: [
    BoardModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    GameComponent,
  ],
  entryComponents: [
    LoseScreenComponent,
    WinScreenComponent,
  ],
})
export class GameModule {
}
