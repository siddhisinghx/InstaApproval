import { TestBed } from '@angular/core/testing';

import { DocURLService } from './doc-url.service';

describe('DocURLService', () => {
  let service: DocURLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocURLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
