import { TestBed } from '@angular/core/testing';

import { FetchPetService } from './fetch-pet.service';

describe('FetchPetService', () => {
  let service: FetchPetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchPetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
