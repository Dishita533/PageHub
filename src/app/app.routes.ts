import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ViewComponent } from './components/view/view.component';
import { authGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  { path: 'view', component: ViewComponent },
  { path: 'favorite', component: FavoriteComponent },
  {
    path: '', redirectTo: 'register', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// Ensure you export `routes` if needed elsewhere
export { routes };
