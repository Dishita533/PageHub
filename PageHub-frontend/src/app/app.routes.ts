import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
// import { NavbarComponent } from './components/navbar/navbar.component';
import { ViewComponent } from './components/view/view.component';
import { authGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

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
    canActivate: [authGuard]
  },
  { path: 'view', component: ViewComponent,canActivate: [authGuard] },
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
