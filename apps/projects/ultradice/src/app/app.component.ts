import { ChangeDetectionStrategy, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Plugins } from '@capacitor/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ResultComponent } from './modules/game/components/result/result.component';
import { GameService } from './services/game.service';

const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  @Input() @HostBinding('class.visible') isVisible: boolean;
  private subscription = Subscription.EMPTY;

  constructor(
    private readonly translate: TranslateService,
    private readonly dialog: MatDialog,
    readonly gameService: GameService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    const lang = 'de';
    this.translate.use(lang);
    const data = require(`../i18n/${lang}.json`);
    this.translate.setTranslation(lang, data, true);

    await SplashScreen.hide();
    this.subscription = this.gameService.state$.subscribe(
      value => {
        this.isVisible = value;
      },
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  displayRanking(): void {
    this.dialog.open(ResultComponent);
  }
}
