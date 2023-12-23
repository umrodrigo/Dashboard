import { TestBed } from '@angular/core/testing';

import { BuildFormDataService } from './buildFormData.service';

describe('BuildFormDataService', () => {
  let service: BuildFormDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildFormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
