import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BoardModule } from '../board/board.module';
import { GameComponent } from './components/game/game.component';
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
        TranslateModule,
    ],
    exports: [
        GameComponent,
    ]
})
export class GameModule {
}
