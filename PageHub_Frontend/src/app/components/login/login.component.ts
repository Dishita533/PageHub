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
import { ActivatedRoute } from '@angular/router';


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
    private msgService: MessageService
  ) { }

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() { return this.loginForm.controls['password']; }

  loginUser() {
    if (this.loginForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.getUserByEmail(email as string).subscribe(
      response => {
        console.log(response);
        if (response.length > 0 && response[0].password === password) {
          sessionStorage.setItem('email', email as string);
          this.router.navigate(['/view']);
        } else {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Email or password is incorrect.' });
        }
      },
      error => {
        console.error(error);
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong.' });
      }
    );
  }

}

