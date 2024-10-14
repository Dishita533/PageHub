import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { RegisterComponent } from './components/register/register.component';
// import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ViewComponent } from './components/view/view.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'Home',
    component: HomeComponent,
    
  },
  {path: 'view', component: ViewComponent},
  { path: 'genre/:genreName', component: ViewComponent },
  { path: 'favorite', component: FavoriteComponent,canActivate: [authGuard] },
  {
    path: '', redirectTo: 'Home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// Ensure you export `routes` if needed elsewhere
export { routes };
