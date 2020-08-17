import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  jwtToken:string;
  decodedJwtToken: { [key:string]: string };

  constructor() { }

  setJwtToken(token:string ) {
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
    return this.decodedJwtToken ? this.decodedJwtToken.displayname : null;
  }

  getExpirationDate() {
    this.decodeToken();
    return this.decodedJwtToken ? this.decodedJwtToken.exp : null;
  }

  isTokenExpired() {
    const expirationTime:number =  Number(this.getExpirationDate());
    if(expirationTime) {
      return ((1000 * expirationTime) - (new Date()).getTime()) < 5000;
    }
    else {
      return false;
    }
  }
}
