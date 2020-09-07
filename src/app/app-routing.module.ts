import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user-components/login/login.component';
import { SignUpComponent } from './user-components/sign-up/sign-up.component';
import { PetDetailsComponent } from './pet-components/pet-details/pet-details.component';
import { FetchPetComponent } from './pet-components/fetch-pet/fetch-pet.component';
import { EditPetComponent } from './pet-components/edit-pet/edit-pet.component';
import { HomeComponent } from './user-components/home/home.component';
import { AddPetComponent } from './pet-components/add-pet/add-pet.component';
import { RoleGuard } from './utility/role-guard/role.guard';

const routes:Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'viewAllPets', component: FetchPetComponent },
  { path: 'petDetails/:id', component: PetDetailsComponent },
  { path: 'addPet', component: AddPetComponent, canActivate: [RoleGuard], data: { allowedRoles: ["ROLE_ADMIN", "ROLE_EDITOR"] }},
  { path: 'editPet/:id', component: EditPetComponent, canActivate: [RoleGuard], data: { allowedRoles: ["ROLE_ADMIN", "ROLE_EDITOR"] }}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
