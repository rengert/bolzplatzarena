import { ChangeDetectionStrategy, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ResultComponent } from '../../game/components/result/result.component';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  @Input() @HostBinding('class.visible') isVisible: boolean;
  subscription: Subscription;

  constructor(private readonly translate: TranslateService, readonly gameService: GameService, private readonly dialog: MatDialog) {
  }

  ngOnInit() {
    const lang = 'de';
    this.translate.use(lang);
    const data = require(`../../../../i18n/${lang}.json`);
    this.translate.setTranslation(lang, data, true);

    this.subscription = this.gameService.state$.subscribe(
      value => {
        this.isVisible = value;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  displayRanking() {
    const dialogReference = this.dialog.open(ResultComponent);
  }
}
