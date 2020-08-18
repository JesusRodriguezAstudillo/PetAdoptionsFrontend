import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pet } from 'src/app/models/Pet';
import { Observable } from 'rxjs';
import { PetDetailsService } from './pet-details.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {

  petObservable:Observable<Pet>;
  petDetails:Pet;

  constructor(private route:ActivatedRoute, private service:PetDetailsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.fetchPetDetails(params.id));
  }

  fetchPetDetails(petId) {
    this
      .service
      .fetchDetails(petId)
      .subscribe(resp => this.petDetails = resp);
  }
}
