import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchPetComponent } from './fetch-pet.component';

describe('FetchPetComponent', () => {
  let component: FetchPetComponent;
  let fixture: ComponentFixture<FetchPetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchPetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
