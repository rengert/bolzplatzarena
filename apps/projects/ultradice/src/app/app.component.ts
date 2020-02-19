import { ChangeDetectionStrategy, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
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
  subscription: Subscription;
  matDialogRef: MatDialogRef<ResultComponent>;

  constructor(private readonly translate: TranslateService, readonly gameService: GameService, private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
    const lang = 'de';
    this.translate.use(lang);
    const data = require(`../i18n/${lang}.json`);
    this.translate.setTranslation(lang, data, true);

    this.subscription = this.gameService.state$.subscribe(
      value => {
        this.isVisible = value;
      },
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.matDialogRef) {
      this.matDialogRef.close();
    }
  }

  displayRanking(): void {
    this.dialog.open(ResultComponent);
  }
}
