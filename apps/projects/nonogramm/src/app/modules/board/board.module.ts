import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { BlockComponent } from './components/board/block/block.component';
import { BoardComponent } from './components/board/board.component';
import { CaptionComponent } from './components/board/caption/caption.component';
import { HeartsComponent } from './components/board/hearts/hearts.component';
import { SettingsViewComponent } from './components/board/settings-view/settings-view.component';
import { CoreModule } from '@bpa/core';

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
    MatSlideToggleModule,
    MatFormFieldModule,
  ],
})
export class BoardModule {
}
