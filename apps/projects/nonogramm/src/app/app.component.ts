import { Component, OnInit } from '@angular/core';
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
  ) {
    this.tracking.startTracking();
  }

  ngOnInit(): void {
    const lang = 'de';
    this.translate.use(lang);
    const data = require(`../i18n/${lang}.json`);
    this.translate.setTranslation(lang, data, true);
  }
}
