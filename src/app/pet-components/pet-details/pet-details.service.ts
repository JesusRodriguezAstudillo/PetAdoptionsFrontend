import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pet } from 'src/app/models/Pet';
import { Observable } from 'rxjs';
import { JwtTokenService } from 'src/app/utility/jwt-components/jwt-token.service';
import { LocalStorageService } from 'src/app/utility/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PetDetailsService {

  constructor(private httpClient:HttpClient, private jwtService:JwtTokenService, private storageService:LocalStorageService) { }

  fetchDetails(petId:number): Observable<Pet> {
    return this.httpClient.get<Pet>("http://localhost:8080/jra/pet/viewPet/" + petId, { responseType: 'json' });
  }

  reservePet(petId:number):Observable<string> {
    if(!this.storageService.get("token")) {
      return new Observable<string>(subscriber => subscriber.next("No token found!"));
    }
    else {
      let headers = new HttpHeaders().set("Authorization", this.storageService.get("token"));
      let body = { "userId": this.jwtService.getUserId(), "petId": petId }

      return this.httpClient.post<string>("http://localhost:8080/jra/pet/reservePet",body, { headers:headers, responseType: 'text' as 'json' });
    }
  }
}
