import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../../../../../core/src/lib/core.module';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    TranslateModule,
  ],
})
export class SettingsModule {
}
