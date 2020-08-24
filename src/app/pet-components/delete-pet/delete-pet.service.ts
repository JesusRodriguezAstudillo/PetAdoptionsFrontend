import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalStorageService } from 'src/app/utility/local-storage/local-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeletePetService {

  constructor(private httpClient:HttpClient, private storageService:LocalStorageService) { }

  deletePet(petId:number):Observable<string> {
    let headers = new HttpHeaders().set("Authorization", this.storageService.get("token"));
    let params = new HttpParams().set("id", petId.toString());

    return this.httpClient.delete<string>("http://localhost:8080/jra/pet/deletePet", { headers:headers, params:params, responseType: "text" as "json" } );
  }
}
