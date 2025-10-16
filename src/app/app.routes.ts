import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CartComponent } from './cart/cart.component';
import { InventoryComponent } from './inventory/inventory.component';
import { PatientLookupComponent } from './patients/patient-lookup/patient-lookup.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'inventory', component: InventoryComponent },
  { path: 'cart', component: CartComponent },
  { path: 'patients', component: PatientLookupComponent },
];


export class AppRoutingModule { }
