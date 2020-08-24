import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  jwtToken:string;
  decodedJwtToken: { [key:string]: string };

  constructor() { }

  setJwtToken(token:string) {
    if(token) {
      this.jwtToken = token;
    }
  }

  getDecodedToken() {
    return jwt_decode(this.jwtToken);
  }

  decodeToken() {
    if(this.jwtToken) {
      this.decodedJwtToken = this.getDecodedToken();
    }
  }

  getUsername() {
    this.decodeToken();
    return this.decodedJwtToken ? this.decodedJwtToken.sub : null;
  }

  getExpirationDate() {
    this.decodeToken();
    return this.decodedJwtToken ? this.decodedJwtToken.exp : null;
  }

  getUserId() {
    this.decodeToken();
    return this.decodedJwtToken ? this.decodedJwtToken.id : null;
  }

  determineRole() {
    this.decodeToken();

    let entries = Object
                    .keys(this.decodedJwtToken.authorities)
                    .map(key => this.decodedJwtToken.authorities[key]['authority'] === "ROLE_ADMIN" || this.decodedJwtToken.authorities[key]['authority'] === "ROLE_EDITOR")
                    .filter(val => val === true);

    if(entries.length === 0) {
      return false;
    }
    else {
      return true;
    }
  }

  isTokenExpired() {
    const expirationTime:number = Number(this.getExpirationDate());
    if(expirationTime) {
      return ((1000 * expirationTime) - (new Date()).getTime()) < 5000;
    }
    else {
      return false;
    }
  }
}
