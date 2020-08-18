import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pet } from 'src/app/models/Pet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetDetailsService {

  constructor(private httpClient:HttpClient) { }

  fetchDetails(petId:number): Observable<Pet> {
    return this.httpClient.get<Pet>("http://localhost:8080/jra/pet/viewPet/" + petId, { responseType: 'json' });
  }
}
