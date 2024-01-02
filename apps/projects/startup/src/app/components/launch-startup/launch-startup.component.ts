import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LaunchStartup, StartupService } from '../../services/startup.service';

@Component({
  selector: 'app-launch-startup',
  templateUrl: './launch-startup.component.html',
  styleUrls: ['./launch-startup.component.scss'],
})
export class LaunchStartupComponent {
  challengeAccepted = false;
  readonly form = new UntypedFormGroup({
    sex: new UntypedFormControl('', Validators.required),
    firstName: new UntypedFormControl('', Validators.required),
    lastName: new UntypedFormControl('', Validators.required),
    startup: new UntypedFormControl('', Validators.required),
    companyType: new UntypedFormControl('', Validators.required),
    companyTopic: new UntypedFormControl('', Validators.required),
    companyDescription: new UntypedFormControl('', Validators.required),
  });

  constructor(
    private readonly startup: StartupService,
    private readonly router: Router,
  ) {
  }

  async launch(): Promise<void> {
    return this.launchStartup({ ...this.form.value });
  }

  async launchStartup(config: LaunchStartup): Promise<void> {
    await this.startup.launch(config)
      .then(() => void this.router.navigate(['/']));
  }
}
