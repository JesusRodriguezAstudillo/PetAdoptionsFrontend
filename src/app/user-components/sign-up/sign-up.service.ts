import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private httpClient:HttpClient) { }

  public createAccount(newUser:User):Observable<string> {
    return this.httpClient.post<string>("http://localhost:8080/jra/user/createAccount", newUser, { responseType: "text" as "json" });
  }
}
