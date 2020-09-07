import { TestBed } from '@angular/core/testing';

import { EditPetService } from './edit-pet.service';

describe('EditPetService', () => {
  let service: EditPetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditPetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
