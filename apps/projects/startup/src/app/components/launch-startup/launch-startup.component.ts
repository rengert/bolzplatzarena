import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LaunchStartup, StartupService } from '../../services/startup.service';

@Component({
  selector: 'app-launch-startup',
  templateUrl: './launch-startup.component.html',
  styleUrls: ['./launch-startup.component.scss'],
})
export class LaunchStartupComponent {
  challengeAccepted = false;
  readonly form = new FormGroup({
    sex: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    startup: new FormControl('', Validators.required),
    companyType: new FormControl('', Validators.required),
    companyTopic: new FormControl('', Validators.required),
    companyDescription: new FormControl('', Validators.required),
  });

  constructor(
    private readonly startup: StartupService,
    private readonly router: Router,
  ) {
  }

  launch(): Promise<void> {
    return this.launchStartup({ ...this.form.value });
  }

  async launchStartup(config: LaunchStartup): Promise<void> {
    await this.startup.launch(config)
      .then(_ => this.router.navigate(['/']));
  }
}
