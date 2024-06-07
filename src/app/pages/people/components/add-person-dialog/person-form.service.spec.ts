import { TestBed } from '@angular/core/testing';

import { PersonFormService } from './person-form.service';

describe('FormServiceService', () => {
  let service: PersonFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
