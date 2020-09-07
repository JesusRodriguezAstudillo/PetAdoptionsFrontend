import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { JwtTokenService } from '../jwt-components/jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router:Router, private jwtTokenService:JwtTokenService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const allowedRoles = next.data.allowedRoles;

      if(this.jwtTokenService.getUsername() && this.jwtTokenService.getRoles().some(role => allowedRoles.includes(role))) {
        if(this.jwtTokenService.isTokenExpired()) {
          this.router.navigate['login'];
          return false;
        }
      }

    return true;
  }
  
}
