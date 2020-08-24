import { Component } from '@angular/core';
import { AuthService } from '../app/utility/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pet-adoptions-frontend';

  constructor(private authService:AuthService) { };
}
