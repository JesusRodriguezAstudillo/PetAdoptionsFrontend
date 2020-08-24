import { Injectable } from '@angular/core';
import { JwtTokenService } from '../jwt-components/jwt-token.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { ifStmt } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtService:JwtTokenService, private localStorageService:LocalStorageService) { 
    this.setJwtToken();
    this.setRole();
  }

  callSetters() {
    this.setJwtToken();
    this.setRole();
  }

  setJwtToken() {
    if(this.localStorageService.get("token")) {
      this.jwtService.setJwtToken(this.localStorageService.get("token"));
    }
  }

  setRole() {
    if(this.localStorageService.get("token")) {
      this.jwtService.determineRole() ? this.localStorageService.set("role", "admin") : this.localStorageService.set("role", "user");
    }
  }
}
