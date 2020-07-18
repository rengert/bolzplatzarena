import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsentComponent, PrivacyGuard } from '@bpa/core';
import { NotesComponent } from './components/content/notes/notes.component';
import { PrivacyComponent } from './components/content/privacy/privacy.component';
import { DebugComponent } from './components/debug/debug.component';
import { LaunchStartupComponent } from './components/launch-startup/launch-startup.component';
import { StartupLaunchedGuard } from './guards/startup-launched.guard';
import { DashBoardComponent } from './modules/dash-board/components/dash-board/dash-board.component';
import { LabourMarketComponent } from './modules/employee/components/labour-market/labour-market.component';
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
              { path: '', component: DashBoardComponent },
            ],
          },
          {
            path: 'open-office',
            component: OpenOfficeComponent,
          },
          {
            path: 'offices',
            component: OfficeListComponent,
          },
          {
            path: 'offices/:id',
            component: OfficeComponent,
          },
          {
            path: 'employee',
            children: [
              {
                path: 'market',
                component: LabourMarketComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'launch', component: LaunchStartupComponent,
      },
    ],
  },
  { path: 'debug', component: DebugComponent },
  { path: 'consent', component: ConsentComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'privacy', component: PrivacyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
