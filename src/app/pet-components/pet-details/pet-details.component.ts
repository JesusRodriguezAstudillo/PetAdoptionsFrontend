import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from 'src/app/models/Pet';
import { Observable } from 'rxjs';
import { PetDetailsService } from './pet-details.service';
import { tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { DeletePetService } from '../delete-pet/delete-pet.service';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {

  petObservable:Observable<Pet>;
  petDetails:Pet;
  reservePetMessage:string;
  petImagePath;
  apiResponse: string;

  constructor(private route:ActivatedRoute, private service:PetDetailsService, private deleteService:DeletePetService, private router:Router, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.fetchPetDetails(params.id));
  }

  fetchPetDetails(petId) {
    this
      .service
      .fetchDetails(petId)
      .subscribe(resp => {
        this.petDetails = resp;
        this.petImagePath = this
                              .sanitizer
                              .bypassSecurityTrustResourceUrl("data:image/"+ this.petDetails.imageExt +";base64," + this.petDetails.image);
        console.log(this.petImagePath);
      });
  }

  reservePet() {
    this
      .service
      .reservePet(this.petDetails.id)
      .subscribe(resp => {
        console.log(resp);
        if(resp === "No token found!") {
          this.reservePetMessage = "Pets can only be reserved by register users.\nPlease log in or make an account to reserve " + this.petDetails.name + "!";
        }
        else {
          this.reservePetMessage = resp;
        }
      }, err => console.log(err.console.error()));
  }

  deletePet() {
    this
      .deleteService
      .deletePet(this.petDetails.id)
      .subscribe(resp => {
        this.apiResponse = resp;
        this.router.navigate(['viewAllPets']);
      }, err => console.log(err.console.error()));
  }
}
