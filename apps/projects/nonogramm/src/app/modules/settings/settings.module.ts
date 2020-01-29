import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatRadioModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    TranslateModule,
  ]
})
export class SettingsModule {
}
