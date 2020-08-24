import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pet } from 'src/app/models/Pet';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/utility/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AddPetService {

  constructor(private httpClient:HttpClient, private storageService:LocalStorageService) { }

  addPet(newPet:Pet):Observable<string> {
    let headers = new HttpHeaders().set("Authorization", this.storageService.get("token"));

    console.log(newPet);
    return this.httpClient.post<string>("http://localhost:8080/jra/pet/addPet", newPet, { headers:headers, responseType: "text" as "json"})
  }
}
