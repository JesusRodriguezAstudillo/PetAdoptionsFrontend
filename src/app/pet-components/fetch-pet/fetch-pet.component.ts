import { Component, OnInit } from '@angular/core';
import { FetchPetService } from './fetch-pet.service';
import { Pet } from '../../models/Pet';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-fetch-pet',
  templateUrl: './fetch-pet.component.html',
  styleUrls: ['./fetch-pet.component.css']
})
export class FetchPetComponent implements OnInit {

  petsArray:Pet[];
  petImageMap = {};

  constructor(private service:FetchPetService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.fetchPets();
  }

  fetchPets() {
    this
      .service
      .fetchPets()
      .subscribe(resp => {
          this.petsArray = resp;
          this.petsArray.forEach(pet => 
            this.petImageMap[pet.id] = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/" + pet.imageExt + ";base64," + pet.image)
          )
          console.log(this.petImageMap);
        }, err => console.log(err.error));
  }
}
