import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { JwtTokenService } from '../../utility/jwt-components/jwt-token.service';
import { LocalStorageService } from '../../utility/local-storage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private loginService:LoginService, private jwtTokenService:JwtTokenService, private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ["",[Validators.required]],
      password: ["",[Validators.required]]
    });
  }

  submit() {
    this
      .loginService
      .login(this.loginForm.value)
      .subscribe(resp => {
          this.jwtTokenService.setJwtToken(resp);
          this.jwtTokenService.decodeToken();
          this.localStorageService.set("token", "Bearer " + this.jwtTokenService.jwtToken);
        }, err => console.log(err.error));
  }
}
