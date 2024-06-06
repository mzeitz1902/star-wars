import { TestBed } from '@angular/core/testing';

import { PeopleViewService } from './people-view.service';

describe('PeopleComponentService', () => {
  let service: PeopleViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleViewService);
  });
});
