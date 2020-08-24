import { TestBed } from '@angular/core/testing';

import { DeletePetService } from './delete-pet.service';

describe('DeletePetService', () => {
  let service: DeletePetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletePetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
