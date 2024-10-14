import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ViewComponent } from './components/view/view.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ToastModule,LoginComponent,RegisterComponent,HomeComponent,NavbarComponent,FooterComponent,ViewComponent,FavoriteComponent,RouterModule],
  templateUrl: './app.component.html',
  providers: [MessageService],
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private messageService: MessageService) {}
  title = 'PageHub';
}
