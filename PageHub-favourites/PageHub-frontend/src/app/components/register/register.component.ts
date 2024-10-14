import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';
import { MessageService } from 'primeng/api';
// import { User } from '../../interfaces/auth';
import { AuthService } from '../../services/auth.service';
import { passwordMatchValidator } from '../../shared/password-match.directive';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    HttpClientModule,
    ToastModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = this.fb.group({
    UserName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Added phone number with validation
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  // Getters for form controls
  get UserName() {
    return this.registerForm.controls['UserName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get phone() { // Getter for phone number
    return this.registerForm.controls['phone'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  register()
  {
    if(this.registerForm.valid)
    {
      let User = {
        "userName": this.registerForm.value.UserName,
        "email": this.registerForm.value.email,
        "password": this.registerForm.value.password,
        
        "mobileNo": this.registerForm.value.phone,
        
        }
    
    // this.authService.registerUser(postData as User).subscribe(
      this.authService.registerUser(User).subscribe();
      this._snackBar.open('Registered successful!', 'Close', {
        duration: 2000, 
      });
      this.router.navigate(['/Login']);
      
    }
    else{
      this._snackBar.open('Check the fields once again and submit', 'Close', {
        duration: 2000, 
      });
    }
  }
}
  
  
  // submitDetails() {
  //   const postData = { ...this.registerForm.value };
  //   delete postData.confirmPassword; // Remove confirmPassword from the final object

  //   // Call auth service to register the user
  //   this.authService.registerUser(postData as User).subscribe(
  //     response => {
  //       console.log(response);
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successfully' });
  //       this.router.navigate(['login']);
  //     },
  //     error => {
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
  //     }
  //   );
  // }
