import { TestBed } from '@angular/core/testing';

import { PrivacyGuard } from './privacy.guard';

describe('PrivacyGuard', () => {
  let guard: PrivacyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PrivacyGuard);
  });

  it('should be created', () => {
    expect(guard)
      .toBeTruthy();
  });
});
