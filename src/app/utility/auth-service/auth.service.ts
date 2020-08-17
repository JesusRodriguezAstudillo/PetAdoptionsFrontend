import { Injectable } from '@angular/core';
import { JwtTokenService } from '../jwt-components/jwt-token.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtService:JwtTokenService, private localStorageService:LocalStorageService) { 
    this.setJwtToken();
  }

  setJwtToken() {
    if(this.localStorageService.get("token")) {
      this.jwtService.setJwtToken(this.localStorageService.get("token"));
    }
  }
}
