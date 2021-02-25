import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { Angulartics2Piwik } from 'angulartics2/piwik';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'nonogramm';

  constructor(
    private readonly tracking: Angulartics2Piwik,
    private readonly translate: TranslateService,
    private readonly update: SwUpdate,
    private readonly snackBar: MatSnackBar,
  ) {
    this.tracking.startTracking();
  }

  async ngOnInit(): Promise<void> {
    const lang = 'de';
    this.translate.use(lang);
    // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
    const data = require(`../i18n/${lang}.json`);
    this.translate.setTranslation(lang, data, true);

    this.update.available.subscribe(_ => alert('update'));
  }
}
