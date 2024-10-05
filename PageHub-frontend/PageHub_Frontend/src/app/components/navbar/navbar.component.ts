import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    NgIf,MatCardModule,MatMenuModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isLoggedIn = false;
  // shouldRun = true; // Your condition
  // sidenavOpened = false;

  // toggleSidenav() {
  //   this.sidenavOpened = !this.sidenavOpened;
  // }

  navigateTo(page: string) {
    // Implement navigation logic here, e.g., using a Router
    console.log(`Navigating to ${page}`);
  }
  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
    if (this.isLoggedIn) {
      console.log('User Logged In');
      // Handle login logic here
    } else {
      console.log('User Logged Out');
      // Handle logout logic here
    }
  }
  private login() {
    // Implement your login logic here
    console.log('Logged in');
  }
  private logout() {
    // Implement your logout logic here
    console.log('Logged out');
  }
}

