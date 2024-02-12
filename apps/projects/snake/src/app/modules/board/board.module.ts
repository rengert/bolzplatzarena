import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@bpa/core';
import { TranslateModule } from '@ngx-translate/core';
import { BoardComponent } from './components/board/board.component';
import { ControlsComponent } from './components/board/controls/controls.component';
import { NavigationComponent } from './components/board/navigation/navigation.component';
import { ScoreComponent } from './components/board/score/score.component';

@NgModule({
  declarations: [
    BoardComponent,
    ControlsComponent,
    NavigationComponent,
    ScoreComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    CoreModule,
    RouterModule,
    TranslateModule.forRoot(),
  ],
})
export class BoardModule {
}
