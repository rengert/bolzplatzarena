import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
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
