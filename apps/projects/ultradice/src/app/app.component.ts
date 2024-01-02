import { ChangeDetectionStrategy, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DialogService } from '../../../core/src/lib/modules/dialog/services/dialog.service';
import { ResultComponent } from './modules/game/components/result/result.component';
import { GameService } from './services/game.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  @Input() @HostBinding('class.visible') isVisible: boolean;

  private subscription = Subscription.EMPTY;
  private endSubscription = Subscription.EMPTY;

  constructor(
    private readonly dialog: DialogService,
    private readonly game: GameService,
    private readonly translate: TranslateService,
    private readonly router: Router,
  ) {
  }

  async ngOnInit(): Promise<void> {
    const lang = 'de';
    this.translate.use(lang);
    const data = require(`../i18n/${lang}.json`);
    this.translate.setTranslation(lang, data, true);

    await SplashScreen.hide();
    this.subscription = this.game.state$.subscribe(
      value => {
        this.isVisible = value;
      },
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.endSubscription.unsubscribe();
  }

  displayRanking(): void {
    this.dialog.open(ResultComponent, {
      width: '90%',
    });
  }

  endGame(): void {
    this.endSubscription.unsubscribe();
    this.endSubscription = this.dialog.confirm({
      title: this.translate.instant('COMPONENTS.APP_COMPONENT.END_GAME.CONFIRM.TITLE'),
      message: this.translate.instant('COMPONENTS.APP_COMPONENT.END_GAME.CONFIRM.MESSAGE'),
    })
      .subscribe(async result => {
        if (!result) {
          return false;
        }

        await this.game.cleanUpGame();

        return this.router.navigate(['/']);
      });
  }
}
