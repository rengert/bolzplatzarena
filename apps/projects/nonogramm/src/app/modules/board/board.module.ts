import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { BlockComponent } from './components/board/block/block.component';
import { CaptionComponent } from './components/board/caption/caption.component';
import { CoreModule } from '../../../../../core/src/lib/core.module';
import { SettingsViewComponent } from './components/board/settings-view/settings-view.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule, MatIconModule, MatSlideToggleModule } from '@angular/material';
import { HeartsComponent } from './components/board/hearts/hearts.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BoardComponent, BlockComponent, CaptionComponent, SettingsViewComponent, HeartsComponent],
  exports: [
    BoardComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    TranslateModule,
    MatIconModule,
    MatSlideToggleModule,
    MatFormFieldModule,
  ]
})
export class BoardModule {
}
