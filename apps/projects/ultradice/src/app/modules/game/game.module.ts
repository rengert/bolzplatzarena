import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@bpa/core';
import { TranslateModule } from '@ngx-translate/core';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { DiceComponent } from './components/dice/dice.component';
import { EndResultComponent } from './components/end-result/end-result.component';
import { GameComponent } from './components/game/game.component';
import { ResultComponent } from './components/result/result.component';
import { RuleComponent } from './components/rule/rule.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule.forChild([
      {
        path: 'create',
        component: CreateGameComponent,
      },
    ]),
    MatInputModule,
    CoreModule,
    DiceComponent,
    GameComponent,
    RuleComponent,
    CreateGameComponent,
    ResultComponent,
    EndResultComponent,
  ],
  exports: [
    ResultComponent,
    EndResultComponent,
  ],
})
export class GameModule {
}
