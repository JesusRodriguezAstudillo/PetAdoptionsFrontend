import { Component, OnInit } from '@angular/core';
import { FetchPetService } from './fetch-pet.service';
import { Pet } from '../../models/Pet';

@Component({
  selector: 'app-fetch-pet',
  templateUrl: './fetch-pet.component.html',
  styleUrls: ['./fetch-pet.component.css']
})
export class FetchPetComponent implements OnInit {

  petsArray:Pet[];

  constructor(private service:FetchPetService) { }

  ngOnInit(): void {
    this.fetchPets();
  }

  fetchPets() {
    this
      .service
      .fetchPets()
      .subscribe(resp => {
          this.petsArray = resp;
        }, err => console.log(err.error));
  }
}
