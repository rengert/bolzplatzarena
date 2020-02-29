import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsentComponent } from '../../../core/src/lib/modules/privacy/components/consent/consent.component';
import { PrivacyGuard } from '../../../core/src/lib/modules/privacy/guards/privacy.guard';
import { NotesComponent } from './components/content/notes/notes.component';
import { PrivacyComponent } from './components/content/privacy/privacy.component';
import { LaunchStartupComponent } from './components/launch-startup/launch-startup.component';
import { StartupLaunchedGuard } from './guards/startup-launched.guard';
import { DashBoardComponent } from './modules/dash-board/components/dash-board/dash-board.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [PrivacyGuard],
    children: [
      {
        path: '',
        canActivate: [StartupLaunchedGuard],
        children: [
          { path: '', component: DashBoardComponent },
        ],
      },
      {
        path: 'launch', component: LaunchStartupComponent,
      },
    ],
  },
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
