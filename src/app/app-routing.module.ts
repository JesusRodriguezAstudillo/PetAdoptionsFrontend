import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user-components/login/login.component';
import { SignUpComponent } from './user-components/sign-up/sign-up.component';
import { PetDetailsComponent } from './pet-components/pet-details/pet-details.component';
import { FetchPetComponent } from './pet-components/fetch-pet/fetch-pet.component';
import { HomeComponent } from './user-components/home/home.component';
import { AddPetComponent } from './pet-components/add-pet/add-pet.component';

const routes:Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'viewAllPets', component: FetchPetComponent },
  { path: 'petDetails/:id', component: PetDetailsComponent },
  { path: 'addPet', component: AddPetComponent }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
