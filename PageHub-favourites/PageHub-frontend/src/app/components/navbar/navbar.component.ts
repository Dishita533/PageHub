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
  isLoggedInFlag = false;
  message:string='';
  constructor(private router: Router) {}
  ngOnInit() {
    this.updateLoginStatus();  // Update login status when component initializes
    this.updateMessage();  // Update the message when component initializes
  }

  updateLoginStatus() {
    this.isLoggedInFlag = this.checkLoginStatus();  // Set the flag based on token existence
  }

  checkLoginStatus(): boolean {
    return localStorage.getItem('token') !== null;  // Check if the token exists
  }
  updateMessage() {
    if (this.checkLoginStatus()) {
      this.message = 'Logout';  // Set message to 'Logout' if logged in
    } else {
      this.message = 'Login';  // Set message to 'Login' if not logged in
    }
  }
  toggleLogin() {
    if (this.checkLoginStatus()) {
      this.logout();  // Logs out the user if token is present
    } else {
      this.router.navigate(['/Login']);  // Redirects to login page if not logged in
    }
  }

  logout() {
    sessionStorage.removeItem('token');  // Remove the token from sessionStorage
    sessionStorage.removeItem('userEmail');  // Optionally remove the user email
    localStorage.removeItem('token');  // Remove the token from localStorage
    localStorage.clear();  // Optionally remove the user email
    this.updateLoginStatus();  // Update login status after logout
    this.updateMessage();  // Update the message after logout
    alert('Logout successful!');
    this.router.navigate(['/Home']);  // Redirect to the home or login page
  }
}
  