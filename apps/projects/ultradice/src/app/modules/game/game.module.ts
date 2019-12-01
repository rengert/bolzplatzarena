import { CreateGameComponent } from './components/create-game/create-game.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { DiceComponent } from './components/dice/dice.component';
import { GameComponent } from './components/game/game.component';
import { RuleComponent } from './components/rule/rule.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material';
import { ResultComponent } from './components/result/result.component';
import { EndResultComponent } from './components/end-result/end-result.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TranslateModule,
    RouterModule.forChild(
      [
        {
            path: 'create',
            component: CreateGameComponent
        },
      ],
    ),
    MatInputModule,
  ],
  declarations: [
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
  ]
})
export class GameModule { }
