import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CoreModule } from '../../../core/src/lib/core.module';
import { ButtonModule } from '../../../core/src/lib/modules/button/button.module';
import { MaterialModule } from '../../../core/src/lib/modules/material/material.module';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './components/base/base.component';
import { NotesComponent } from './components/content/notes/notes.component';
import { PrivacyComponent } from './components/content/privacy/privacy.component';
import { DebugComponent } from './components/debug/debug.component';
import { LevelsComponent } from './components/debug/levels/levels.component';
import { ProfessionsComponent } from './components/debug/professions/professions.component';
import { LaunchStartupComponent } from './components/launch-startup/launch-startup.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { StartupAvatarComponent } from './components/navigation/startup-avatar/startup-avatar.component';
import { DashBoardModule } from './modules/dash-board/dash-board.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { OfficesModule } from './modules/offices/offices.module';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    DebugComponent,
    LaunchStartupComponent,
    LevelsComponent,
    NavigationComponent,
    NotesComponent,
    PrivacyComponent,
    ProfessionsComponent,
    StartupAvatarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    CommonModule,
    CoreModule,
    DashBoardModule,
    EmployeeModule,
    MaterialModule,
    OfficesModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always', appearance: 'fill' } },
  ],
  bootstrap: [AppComponent],
  exports: [
    StartupAvatarComponent,
  ],
})
export class AppModule {
}
