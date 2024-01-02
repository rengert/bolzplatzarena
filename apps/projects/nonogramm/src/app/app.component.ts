import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'nonogramm';

  constructor(private readonly translate: TranslateService,) {
  }

  ngOnInit(): void {
    const lang = 'de';
    this.translate.use(lang);
    // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
    const data = require(`../i18n/${lang}.json`);
    this.translate.setTranslation(lang, data, true);
  }
}
