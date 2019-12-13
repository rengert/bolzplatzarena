import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings/settings.component';
import { MatButtonModule, MatRadioModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatRadioModule,
    TranslateModule,
  ]
})
export class SettingsModule {
}
