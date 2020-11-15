import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsentComponent, PrivacyGuard } from '@bpa/core';
import { NotesComponent } from './components/content/notes/notes.component';
import { PrivacyComponent } from './components/content/privacy/privacy.component';
import { DebugComponent } from './components/debug/debug.component';
import { LaunchStartupComponent } from './components/launch-startup/launch-startup.component';
import { StartupLaunchedGuard } from './guards/startup-launched.guard';
import { CreditAuditComponent } from './modules/credit/components/credit-audit/credit-audit.component';
import { DashBoardComponent } from './modules/dash-board/components/dash-board/dash-board.component';
import { EmployeeComponent } from './modules/employee/components/employee/employee.component';
import { LabourMarketComponent } from './modules/employee/components/labour-market/labour-market.component';
import { WorkerComponent } from './modules/employee/components/worker/worker.component';
import { OfficeListComponent } from './modules/offices/components/office-list/office-list.component';
import { OfficeComponent } from './modules/offices/components/office/office.component';
import { OpenOfficeComponent } from './modules/offices/components/open-office/open-office.component';
import { AtLeastOneOfficeGuard } from './modules/offices/guards/at-least-one-office.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [PrivacyGuard],
    children: [
      {
        path: '',
        canActivate: [StartupLaunchedGuard],
        children: [
          {
            path: '',
            canActivate: [AtLeastOneOfficeGuard],
            children: [
              { path: '', component: DashBoardComponent, data: { title: 'Dashboard' } },
            ],
          },
          {
            path: 'open-office',
            component: OpenOfficeComponent,
            data: { title: 'Neuen Standort eröffnen' },
          },
          {
            path: 'offices',
            component: OfficeListComponent,
            data: { title: 'Standorte' },
          },
          {
            path: 'offices/:id',
            component: OfficeComponent,
            data: { title: 'Standort' },
          },
          {
            path: 'employee',
            children: [
              {
                path: 'own',
                component: EmployeeComponent,
                data: { title: 'Mitarbeiter' },
              },
              {
                path: 'market',
                component: LabourMarketComponent,
                data: { title: 'Arbeitsmarkt' },
              },
              {
                path: ':id',
                component: WorkerComponent,
                data: { title: 'Informationen zur Person' },
              },
            ],
          },
          {
            path: 'credit',
            children: [
              {
                path: 'audit',
                component: CreditAuditComponent,
                data: { title: 'Ausgaben / Einnahmen' },
              },
            ],
          },
        ],
      },
      {
        path: 'launch', component: LaunchStartupComponent, data: { title: 'Gründen' },
      },
    ],
  },
  { path: 'debug', component: DebugComponent, data: { title: 'Debugging' } },
  { path: 'consent', component: ConsentComponent, data: { title: 'Consent' } },
  { path: 'notes', component: NotesComponent, data: { title: 'Notes' } },
  { path: 'privacy', component: PrivacyComponent, data: { title: 'Privacy' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
