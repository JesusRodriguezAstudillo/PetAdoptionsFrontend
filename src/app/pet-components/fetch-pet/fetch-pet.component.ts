import { Component, OnInit } from '@angular/core';
import { FetchPetService } from './fetch-pet.service';
import { Pet } from '../../models/Pet';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService } from 'src/app/utility/local-storage/local-storage.service';

@Component({
  selector: 'app-fetch-pet',
  templateUrl: './fetch-pet.component.html',
  styleUrls: ['./fetch-pet.component.css']
})
export class FetchPetComponent implements OnInit {

  petsArray:Pet[];
  petImageMap = {};
  isAdmin:boolean;

  constructor(private service:FetchPetService, private sanitizer:DomSanitizer, private storageService:LocalStorageService) { }

  ngOnInit(): void {
    this.fetchPets();
    this.isAdmin = this.storageService.get("role") === "admin" ? true : false;
  }

  fetchPets() {
    this
      .service
      .fetchPets()
      .subscribe(resp => {
          this.petsArray = resp;
          this.petsArray.forEach(pet => 
            this.petImageMap[pet.id] = this
                                        .sanitizer
                                        .bypassSecurityTrustResourceUrl("data:image/" + pet.imageExt + ";base64," + pet.image)
          )
        }, err => console.log(err.error));
  }
}
