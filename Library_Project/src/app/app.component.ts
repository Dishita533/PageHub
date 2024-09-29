import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddComponent } from './add/add.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AddComponent,FooterComponent,NavbarComponent,HomeComponent],
  templateUrl: './app.component.html',  
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Library_Project';
}
