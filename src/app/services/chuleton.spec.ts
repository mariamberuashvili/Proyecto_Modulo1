import { TestBed } from '@angular/core/testing';

import { Chuleton } from './chuleton';

describe('Chuleton', () => {
  let service: Chuleton;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Chuleton);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
