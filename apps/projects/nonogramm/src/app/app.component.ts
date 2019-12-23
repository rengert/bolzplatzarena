import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nonogramm';

  constructor(private readonly translate: TranslateService) {
  }

  ngOnInit() {
    const lang = 'de';
    this.translate.use(lang);
    const data = require(`../i18n/${lang}.json`);
    this.translate.setTranslation(lang, data, true);
  }
}
