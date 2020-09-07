import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetDetailsService } from '../pet-details/pet-details.service';
import { DeletePetComponent } from '../delete-pet/delete-pet.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DeletePetService } from '../delete-pet/delete-pet.service';
import { tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Pet } from 'src/app/models/Pet';
import { EditPetService } from './edit-pet.service';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {

  editPetForm:FormGroup;
  pet:Observable<Pet>;
  p:Pet;
  petImagePreviewSrc;
  responseMsg:string;

  constructor(private formBuilder:FormBuilder, private route:ActivatedRoute, 
    private detailsService:PetDetailsService, private deleteService:DeletePetService, 
    private editService:EditPetService, private sanitizer:DomSanitizer, 
    private changeDetector:ChangeDetectorRef, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.getPetDetails(params.id))
    
    this.editPetForm = this.formBuilder.group({
      name:["",[Validators.required]],
      species:["",[Validators.required]],
      breed:["",[Validators.required]],
      gender:["",[Validators.required]],
      ageYears:["",[Validators.required]],
      ageMonths:["",[Validators.required]],
      vaccinated:["",[Validators.required]],
      image:[null, []]
    });
  }

  getPetDetails(petId) {
    this
      .detailsService
      .fetchDetails(petId)
      .pipe(tap(petInfo => {

        if(petInfo.image && petInfo.imageExt) {
          console.log("pet has an image")
          let fileReader = new FileReader();
          fileReader.readAsDataURL(this.generateImageBlob(petInfo.image, petInfo.imageExt));

          fileReader.onload = () => {
            this.editPetForm.patchValue({
              image: fileReader.result
            })

            this.changeDetector.markForCheck();
          }

          this.petImagePreviewSrc = this
                                    .sanitizer
                                    .bypassSecurityTrustResourceUrl("data:image/"+petInfo.imageExt+";base64,"+petInfo.image);
        }

        this.editPetForm.patchValue({
          name: petInfo.name,
          species: petInfo.species,
          breed: petInfo.breed,
          gender: petInfo.gender,
          ageYears: petInfo.ageYears,
          ageMonths: petInfo.ageMonths,
          vaccinated: petInfo.vaccinated ? "true" : "false",
        })

        // let fileReader = new FileReader();
        // let imgByteString = atob(petInfo.image);
        // let imgArrayBuffer = new ArrayBuffer(imgByteString.length);
        // let int8Array = new Uint8Array(imgArrayBuffer);
        
        // for(let i = 0; i < petInfo.image.length; i++) {
        //   int8Array[i] = petInfo.image.charCodeAt(i);
        // }

        // // use this code to get the bynary string as a blob object and append to the form
        // let imageFile = new Blob(["data:image/", petInfo.imageExt, ";base64,", imgArrayBuffer]);
        //fileReader.readAsDataURL(imageFile);

        // fileReader.onload = () => {
        //   this.editPetForm.patchValue({
        //     name: petInfo.name,
        //     species: petInfo.species,
        //     breed: petInfo.breed,
        //     gender: petInfo.gender,
        //     ageYears: petInfo.ageYears,
        //     ageMonths: petInfo.ageMonths,
        //     vaccinated: petInfo.vaccinated ? "true" : "false",
        //     image: fileReader.result
        //   });

        //   this.changeDetector.markForCheck();
        // };

        // this.petImagePreviewSrc = this
        //                             .sanitizer
        //                             .bypassSecurityTrustResourceUrl("data:image/"+petInfo.imageExt+";base64,"+petInfo.image);
    })).subscribe(pet => this.p = pet);
  }

  generateImageBlob(petImage, petImageExt) {
    let fileReader = new FileReader();
        let imgByteString = atob(petImage);
        let imgArrayBuffer = new ArrayBuffer(imgByteString.length);
        let int8Array = new Uint8Array(imgArrayBuffer);
        
        for(let i = 0; i < petImage.length; i++) {
          int8Array[i] = petImage.charCodeAt(i);
        }

        // use this code to get the bynary string as a blob object and append to the form
        let imageFile = new Blob(["data:image/", petImageExt, ";base64,", imgArrayBuffer]);
        return imageFile;
        //fileReader.readAsDataURL(imageFile);
  }

  imageChangeEvent(event){
    const fileReader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {

        this.petImagePreviewSrc = this
        .sanitizer
        .bypassSecurityTrustResourceUrl(fileReader.result.toString());

        this.editPetForm.patchValue({
          image: fileReader.result
        });

        this.changeDetector.markForCheck();
      }
    }
  }

  getImageExtension(imgArray:string) {
    let firstFilter = imgArray.split(/data:image\//)[1];
    let secondFilter = firstFilter.split(/;base64.*/);
    
    return secondFilter[0];
  }

  getImageData(imgArray:string){
    let filteredImg = imgArray.split(/data:image\/.*;base64,/)
 
    return filteredImg[1];
  }

  formValuesToModel() {
    let newPet = new Pet();
    newPet.id = this.p.id;
    newPet.name = this.editPetForm.get("name").value;
    newPet.breed = this.editPetForm.get("breed").value;
    newPet.species = this.editPetForm.get("species").value;
    newPet.gender = this.editPetForm.get("gender").value;
    newPet.vaccinated = this.editPetForm.get("vaccinated").value;
    newPet.ageYears = this.editPetForm.get("ageYears").value;
    newPet.ageMonths = this.editPetForm.get("ageMonths").value;
    if(this.editPetForm.get("image").value) {
      newPet.image = this.getImageData(this.editPetForm.get("image").value);
      newPet.imageExt = this.getImageExtension(this.editPetForm.get("image").value);
    }

    return newPet;
  }

  editPetInfo() {
    this
      .editService
      .editPet(this.formValuesToModel())
      .subscribe(resp => {
        console.log(resp);
        this.responseMsg = resp;
      }, err => console.log(err.error));
  }

  deletePet() {
    this
      .deleteService
      .deletePet(this.p.id)
      .subscribe(resp => {
        this.responseMsg = resp;
        this.router.navigate(['viewAllPets']);
      }, err => console.log(err.error));
  }
}
