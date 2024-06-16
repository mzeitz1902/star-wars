import { TestBed } from '@angular/core/testing';

import { PeopleView2Service } from './people-view2.service';

describe('PeopleView2Service', () => {
  let service: PeopleView2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleView2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
