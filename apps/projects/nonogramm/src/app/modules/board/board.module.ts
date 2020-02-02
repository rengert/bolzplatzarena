import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatSlideToggleModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../../../../../core/src/lib/core.module';
import { BlockComponent } from './components/board/block/block.component';
import { BoardComponent } from './components/board/board.component';
import { CaptionComponent } from './components/board/caption/caption.component';
import { HeartsComponent } from './components/board/hearts/hearts.component';
import { SettingsViewComponent } from './components/board/settings-view/settings-view.component';

@NgModule({
  declarations: [
    BoardComponent,
    BlockComponent,
    CaptionComponent,
    SettingsViewComponent,
    HeartsComponent,
  ],
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
})
export class BoardModule {
}
