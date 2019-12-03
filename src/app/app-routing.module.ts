import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './autentication/login/login.component';
import { AuthGuard } from './core/guard/auth-guard';


const homeRoute: Route = {
  path: 'home',
  component: HomeComponent,
  canActivate: [AuthGuard],
};

const loginRoute: Route = {
  path: 'login',
  component: LoginComponent,
};

const contactRoute: Route = {
  path: 'contacts/list',
  component: ContactListComponent,
  canActivate: [AuthGuard],
};

const defaultHomeRoute: Route = {
  path: '**',
  redirectTo: 'home',
  pathMatch: 'full'
};

const routes: Routes = [
  homeRoute,
  loginRoute,
  contactRoute,
  defaultHomeRoute
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
