import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrivacyService } from '../../services/privacy.service';

@Component({
  selector: 'lib-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.css'],
})
export class ConsentComponent {

  constructor(private readonly privacy: PrivacyService, private readonly router: Router) {
  }

  setConsent(): Promise<boolean> {
    this.privacy.setConstent();

    return this.router.navigate(['/']);
  }
}
