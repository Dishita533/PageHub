import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerMock: jasmine.SpyObj<Router>;
  let snackBarMock: jasmine.SpyObj<MatSnackBar>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;
  let activatedRouteMock: any;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['Login']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);
    messageServiceMock = jasmine.createSpyObj('MessageService', ['add']);
    activatedRouteMock = { params: of({}) }; // Mock ActivatedRoute

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent,HttpClientModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: MessageService, useValue: messageServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the login button when the form is invalid', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(button.disabled).toBeTrue();
  });

  it('should show error message when login fails', () => {
    authServiceMock.Login.and.returnValue(throwError(() => new Error('Invalid credentials')));
    component.loginForm.controls['email'].setValue('wrong@example.com');
    component.loginForm.controls['password'].setValue('wrongpassword');
    
    component.login(); // Trigger login

    expect(snackBarMock.open).toHaveBeenCalledWith('Invalid Credentials', 'Close', {
      duration: 2000,
    });
  });

  it('should navigate to "/view" on successful login', () => {
    const mockResponse = { token: 'mock-token' };
    authServiceMock.Login.and.returnValue(of(mockResponse)); // Ensure it returns an observable

    component.loginForm.controls['email'].setValue('test@gmail.com');
    component.loginForm.controls['password'].setValue('1234');
    
    component.login(); // Trigger login

    expect(authServiceMock.Login).toHaveBeenCalledWith(jasmine.objectContaining({
      email: 'test@gmail.com',
      password: '1234',
    }));
    expect(routerMock.navigate).toHaveBeenCalledWith(['/view']);
    expect(snackBarMock.open).toHaveBeenCalledWith('Login successful!', 'Close', {
      duration: 2000,
    });
  });
});
