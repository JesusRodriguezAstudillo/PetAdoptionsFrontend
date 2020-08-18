import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from 'src/app/models/Pet';

@Injectable({
  providedIn: 'root'
})
export class FetchPetService {

  constructor(private httpClient:HttpClient) { }

  fetchPets():Observable<Pet[]> {
    return this.httpClient.get<Pet[]>("http://localhost:8080/jra/pet/viewAllPets", { responseType: "json" });
  }
}
