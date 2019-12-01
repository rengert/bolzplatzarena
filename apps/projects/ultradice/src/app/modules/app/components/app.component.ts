import { ResultComponent } from './../../game/components/result/result.component';
import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {GameService} from '../../../services/game.service';
import {Subscription} from 'rxjs';
import { MatDialog } from '@angular/material';
import { ImprintComponent } from '../../info/components/imprint/imprint.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @Input('visible') @HostBinding('class.visible') IsVisible: boolean;
  subscription: Subscription;

  constructor(private readonly translate: TranslateService, readonly gameService: GameService, readonly dialog: MatDialog) {
  }

  ngOnInit() {
    const lang = 'de';
    this.translate.use(lang);
    const data = require(`../../../../i18n/${lang}.json`);
    this.translate.setTranslation(lang, data, true);

    this.subscription = this.gameService.state$.subscribe(
      value => {
        this.IsVisible = value;
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
