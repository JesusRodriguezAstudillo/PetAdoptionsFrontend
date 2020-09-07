import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pet } from 'src/app/models/Pet';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/utility/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EditPetService {

  constructor(private httpClient:HttpClient, private storageService:LocalStorageService) { }

  editPet(pet:Pet):Observable<string> {
    let httpHeaders = new HttpHeaders().set("Authorization", this.storageService.get("token"));

    return this.httpClient.put<string>("http://localhost:8080/jra/pet/editPet/" + pet.id, pet, { headers: httpHeaders, responseType: "text" as "json" });
  }
}
