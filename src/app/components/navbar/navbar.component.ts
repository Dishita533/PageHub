import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    NgIf,MatCardModule,MatMenuModule,RouterModule,CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isLoggedIn = false;
  constructor(private router: Router) {}
  toggleLogin() {

    if (this.isLoggedIn) {
      
      this.router.navigate(['/Login']);
      // this.router.navigate(['/']); // Redirect to home or login page after logout
    } else {
      // Navigate to login page for login
      this.router.navigate(['/Login']).then(() => {
        // After successful login, change isLoggedIn to true (this is for demonstration)
        // Ideally, this should happen after verifying login credentials in your login component
        // this.isLoggedIn = true;
        // localStorage.setItem('token', 'dummy_token'); // Set a token or session data
      });
    }
    // logout() {
    //   this.router.navigate(['/login']);
    // }
  
    // login(){
    //   this.router.navigate(['/login']);
    // }
  }
  // toggleLogin() {
  //   if (this.isLoggedIn) {
  //     // Perform logout logic here, e.g., clearing tokens or session data
  //     this.isLoggedIn = false;
  //     this.router.navigate(['/']); // Redirect to home page or login page after logout
  //   } else {
  //     // Navigate to login page
  //     this.router.navigate(['/Login']);
  //   }
  // }
  // navigateTo(page: string) {
  //   // Implement navigation logic here, e.g., using a Router
  //   console.log(Navigating to ${page});
  // }
  // toggleLogin() {
  //   this.isLoggedIn = !this.isLoggedIn;
  //   if (this.isLoggedIn) {
  //     console.log('User Logged In');
  //     // Handle login logic here
  //   } else {
  //     console.log('User Logged Out');
  //     // Handle logout logic here
  //   }
  // }
  // private login() {
  //   // Implement your login logic here
  //   console.log('Logged in');
  // }
  // private logout() {
  //   // Implement your logout logic here
  //   console.log('Logged out');
  // }
} 
