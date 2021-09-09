import { TestBed } from '@angular/core/testing';

import { BankAuthorityService } from './bank-authority.service';

describe('BankAuthorityService', () => {
  let service: BankAuthorityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankAuthorityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
