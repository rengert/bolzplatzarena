import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { BlockComponent } from './components/board/block/block.component';
import { BoardComponent } from './components/board/board.component';
import { CaptionComponent } from './components/board/caption/caption.component';
import { HeartsComponent } from './components/board/hearts/hearts.component';
import { SettingsViewComponent } from './components/board/settings-view/settings-view.component';
import { CoreModule } from '@bpa/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    BoardComponent,
    BlockComponent,
    CaptionComponent,
    HeartsComponent,
    SettingsViewComponent,
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
    MatFormFieldModule,
  ],
})
export class BoardModule {
}
