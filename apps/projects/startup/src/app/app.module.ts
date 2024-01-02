import { CommonModule, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ButtonModule, ConsoleLoggerService, CoreModule, LOGGER, NavigationModule } from '@bpa/core';
import { WorkerModule } from 'angular-web-worker/angular';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './components/base/base.component';
import { NotesComponent } from './components/content/notes/notes.component';
import { PrivacyComponent } from './components/content/privacy/privacy.component';
import { CreditComponent } from './components/credit/credit.component';
import { DateComponent } from './components/date/date.component';
import { CitiesComponent } from './components/debug/cities/cities.component';
import { DebugComponent } from './components/debug/debug.component';
import { LevelsComponent } from './components/debug/levels/levels.component';
import { ProfessionsComponent } from './components/debug/professions/professions.component';
import { LaunchStartupComponent } from './components/launch-startup/launch-startup.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { StartupAvatarComponent } from './components/navigation/startup-avatar/startup-avatar.component';
import { BaseModule } from './modules/base/base.module';
import { CreditModule } from './modules/credit/credit.module';
import { DashBoardModule } from './modules/dash-board/dash-board.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { OfficesModule } from './modules/offices/offices.module';
import { PropertySimulatorService } from './services/simulators/property-simulator.service';
import { SalarySimulatorService } from './services/simulators/salary-simulator.service';
import { SIMULATOR } from './services/simulators/simulator';
import { PropertyWorker } from './workers/property.worker';

registerLocaleData(localeDe);

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
    CitiesComponent,
    CreditComponent,
    DateComponent,
  ],
  imports: [
    AppRoutingModule,
    BaseModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    CommonModule,
    CoreModule,
    CreditModule,
    DashBoardModule,
    EmployeeModule,
    OfficesModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NavigationModule,

    WorkerModule.forWorkers([
      {
        worker: PropertyWorker,
        initFn: () => new Worker(new URL('./workers/property.worker.ts', import.meta.url), { type: 'module' }),
      },
    ]),
    MatListModule,
    MatLineModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de' },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always', appearance: 'fill' } },
    { provide: LOGGER, useClass: ConsoleLoggerService, multi: true },

    { provide: SIMULATOR, useClass: PropertySimulatorService, multi: true },
    { provide: SIMULATOR, useClass: SalarySimulatorService, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [
    StartupAvatarComponent,
  ],
})
export class AppModule {
}
