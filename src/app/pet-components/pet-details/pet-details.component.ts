import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from 'src/app/models/Pet';
import { Observable } from 'rxjs';
import { PetDetailsService } from './pet-details.service';
import { tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { DeletePetService } from '../delete-pet/delete-pet.service';
import { AuthService } from 'src/app/utility/auth-service/auth.service';
import { LocalStorageService } from 'src/app/utility/local-storage/local-storage.service';

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
  isAdmin:boolean;

  constructor(private route:ActivatedRoute, private service:PetDetailsService, private deleteService:DeletePetService, private router:Router, private sanitizer:DomSanitizer, private storageService:LocalStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.fetchPetDetails(params.id));
    this.storageService.get("role") === "admin" ? this.isAdmin = true : this.isAdmin = false;
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
      });
  }

  reservePet() {
    this
      .service
      .reservePet(this.petDetails.id)
      .subscribe(resp => {
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
