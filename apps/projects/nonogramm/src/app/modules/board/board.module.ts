import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from '@bpa/core';
import { TranslateModule } from '@ngx-translate/core';
import { BlockComponent } from './components/board/block/block.component';
import { BoardComponent } from './components/board/board.component';
import { CaptionComponent } from './components/board/caption/caption.component';
import { HeartsComponent } from './components/board/hearts/hearts.component';
import { SettingsViewComponent } from './components/board/settings-view/settings-view.component';

@NgModule({
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
    BoardComponent,
    BlockComponent,
    CaptionComponent,
    HeartsComponent,
    SettingsViewComponent,
  ],
})
export class BoardModule {
}
