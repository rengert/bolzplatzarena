import { ChangeDetectionStrategy, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DialogService } from '../../../core/src/lib/modules/dialog/services/dialog.service';
import { ResultComponent } from './modules/game/components/result/result.component';
import { GameService } from './services/game.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    TranslateModule,
    RouterLink,
    RouterOutlet,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  @Input() @HostBinding('class.visible') isVisible: boolean;

  private endSubscription = Subscription.EMPTY;

  constructor(
    readonly game: GameService,
    private readonly dialog: DialogService,
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
  }

  ngOnDestroy(): void {
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
