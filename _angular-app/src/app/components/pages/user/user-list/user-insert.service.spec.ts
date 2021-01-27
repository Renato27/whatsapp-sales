import { TestBed } from '@angular/core/testing';

import { UserInsertService } from './user-insert.service';

describe('UserInsertService', () => {
  let service: UserInsertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInsertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
