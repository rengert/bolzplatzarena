import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SplashScreen } from '@capacitor/splash-screen';

// eslint-disable-next-line @typescript-eslint/naming-convention

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private readonly translate: TranslateService) {
  }

  async ngOnInit(): Promise<void> {
    const lang = 'de';
    this.translate.use(lang);
    // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
    const data = require(`../i18n/${lang}.json`);
    this.translate.setTranslation(lang, data, true);

    return SplashScreen?.hide();
  }
}
