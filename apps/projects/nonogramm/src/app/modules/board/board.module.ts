import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { BlockComponent } from './components/board/block/block.component';
import { CaptionComponent } from './components/board/caption/caption.component';
import { CoreModule } from '../../../../../core/src/lib/core.module';
import { SettingsViewComponent } from './components/board/settings-view/settings-view.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatSlideToggleModule } from '@angular/material';
import { HeartsComponent } from './components/board/hearts/hearts.component';
import { FormsModule } from '@angular/forms';
import { WinScreenComponent } from './components/board/win-screen/win-screen.component';

@NgModule({
  declarations: [BoardComponent, BlockComponent, CaptionComponent, SettingsViewComponent, HeartsComponent, WinScreenComponent],
  exports: [
    BoardComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    TranslateModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSlideToggleModule,
    MatFormFieldModule,
  ],
  entryComponents: [
    WinScreenComponent,
  ]
})
export class BoardModule {
}
