import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './user-components/login/login.component';
import { SignUpComponent } from './user-components/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FetchPetComponent } from './pet-components/fetch-pet/fetch-pet.component';
import { GenderPipe } from './utility/pipes/gender.pipe';
import { PetDetailsComponent } from './pet-components/pet-details/pet-details.component';
import { HomeComponent } from './user-components/home/home.component';
import { NavbarComponent } from './user-components/navbar/navbar.component';
import { AddPetComponent } from './pet-components/add-pet/add-pet.component';
import { DeletePetComponent } from './pet-components/delete-pet/delete-pet.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    FetchPetComponent,
    GenderPipe,
    PetDetailsComponent,
    HomeComponent,
    NavbarComponent,
    AddPetComponent,
    DeletePetComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
