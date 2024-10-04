import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from '../../interfaces/auth';
import { AuthService } from '../../services/auth.service';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { login } from '../../models/login.model';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService,
    private _snackBar: MatSnackBar
  ) { }


  get email() {
    return this.loginForm.controls['email'];
  }
  get password() { return this.loginForm.controls['password']; }
  logindata= new login(); 
  login() {
    if (this.loginForm.valid) {
        this.logindata= {
          email: this.loginForm.get("email")?.value || '', // Fallback to empty string if null
          password: this.loginForm.get("password")?.value || ''
          //"email":this.loginForm.get("email")?.value
        //"email": this.loginForm.value.email,
        //"password": this.loginForm.value.password
      };
  
      this.authService.Login(this.logindata).subscribe(
        (data: any) => {
          console.log(data);
          
          // Check if the API returned a token or success message
          if (data && data.token) {
            sessionStorage.setItem('token', data.token); // Store token for authenticated sessions
            localStorage.setItem('token', data.token);
            this._snackBar.open('Login successful!', 'Close', {
              duration: 2000,
            });
            this.router.navigate(['/view']); // Navigate to View page on successful login
          } else {
            this._snackBar.open('Invalid credentials!', 'Close', {
              duration: 2000,
            });
            
          }
        },
        error => {
          console.error(error);
          this._snackBar.open('Invalid Credentials', 'Close', {
            duration: 2000,
          });
        }
      );
    } else {
      this._snackBar.open('Please fill in all fields correctly!', 'Close', {
        duration: 2000,
      });
    }
  }
  

}

