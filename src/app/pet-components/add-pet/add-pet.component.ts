import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddPetService } from './add-pet.service';
import { ReadVarExpr } from '@angular/compiler';
import { Pet } from 'src/app/models/Pet';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {

  petForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private service:AddPetService, private changeDetector:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.petForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      species: ['', [Validators.required]],
      breed: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      ageYears: ['', [Validators.required]],
      ageMonths: ['', [Validators.required]],
      vaccinated: ['', [Validators.required]],
      image: [null, []]
    });
  }

  fileChangeEvent(event) {
    const fileReader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      fileReader.readAsDataURL(file);
      

      fileReader.onload = () => {

        this.petForm.patchValue({
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
    newPet.name = this.petForm.get("name").value;
    newPet.breed = this.petForm.get("breed").value;
    newPet.species = this.petForm.get("species").value;
    newPet.gender = this.petForm.get("gender").value;
    newPet.vaccinated = this.petForm.get("vaccinated").value;
    newPet.ageYears = this.petForm.get("ageYears").value;
    newPet.ageMonths = this.petForm.get("ageMonths").value;
    newPet.image = this.getImageData(this.petForm.get("image").value);
    newPet.imageExt = this.getImageExtension(this.petForm.get("image").value);

    return newPet;
  }

  addPet() {
    this
      .service
      .addPet(this.formValuesToModel())
      .subscribe(resp => console.log(resp), err => console.log(err));
  }
}
