import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SplashScreen } from '@capacitor/splash-screen';
import * as de from '../i18n/de.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private readonly translate: TranslateService) {
  }

  async ngOnInit(): Promise<void> {
    this.translate.use('de');
    this.translate.setTranslation('de', de, true);

    return SplashScreen?.hide();
  }
}
