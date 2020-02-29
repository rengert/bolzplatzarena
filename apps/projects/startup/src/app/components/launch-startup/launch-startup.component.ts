import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LaunchStartup } from '../../services/startup.service';

@Component({
  selector: 'app-launch-startup',
  templateUrl: './launch-startup.component.html',
  styleUrls: ['./launch-startup.component.scss'],
})
export class LaunchStartupComponent {
  readonly form = new FormGroup({
    sex: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    startup: new FormControl('', Validators.required),
    companyType: new FormControl('', Validators.required),
    companyTopic: new FormControl('', Validators.required),
    companyDescription: new FormControl('', Validators.required),
  });

  async launch(): Promise<void> {
    this.launchStartup({ ...this.form.value });

    return;
  }

  launchStartup(config: LaunchStartup): void {
    //
  }
}
