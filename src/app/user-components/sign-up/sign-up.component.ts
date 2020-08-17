import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from './sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private service:SignUpService) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: ["",[Validators.required]],
      email: ["",[Validators.required,Validators.email]],
      password: ["",[Validators.required]]
    });
  }

  submit() {
    this.service.createAccount(this.signUpForm.value).subscribe(resp => console.log(resp), err => console.log(err.console.error()));
  }
}
