import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { JwtTokenService } from '../../utility/jwt-components/jwt-token.service';
import { LocalStorageService } from '../../utility/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utility/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private loginService:LoginService, private localStorageService:LocalStorageService, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.localStorageService.clear();

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
          this.localStorageService.set("token", "Bearer " + resp);
          this.authService.callSetters();

          this.router.navigate(['']);
        }, err => console.log(err.error));
  }
}
