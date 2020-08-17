import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { UserAuthRequest } from '../../models/UserAuthRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpClient:HttpClient;

  constructor(httpBackend:HttpBackend) { 
    this.httpClient = new HttpClient(httpBackend);
  }

  login(user:UserAuthRequest):Observable<string> {
    return this.httpClient.post<string>("http://localhost:8080/jra/user/login", user, { responseType: "text" as "json" });
  }
}
