import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/utility/auth-service/auth.service';
import { LocalStorageService } from 'src/app/utility/local-storage/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  role:string;

  constructor(private storageService:LocalStorageService, private router:Router, private authService:AuthService) {
      this.router.events.subscribe(x => {
      if(x.constructor.name === "NavigationEnd" && !this.role){
        this.role = this.storageService.get("role");
      }
    })
  }

  ngOnInit(): void {

  }
}
