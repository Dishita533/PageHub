import { TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { FooterComponent } from './components/footer/footer.component';
import { ViewComponent } from './components/view/view.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let fixture: any;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterOutlet,
        ToastModule,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        NavbarComponent,
        FooterComponent,
        ViewComponent,
        FavoriteComponent,
        AppComponent // Add AppComponent to imports instead of declarations
      ],
      providers: [
        MessageService,
        {
          provide: ActivatedRoute,
          useValue: {
            // Mock the properties and methods of ActivatedRoute if needed
            snapshot: {
              params: {}
            },
            params: of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'PageHub'`, () => {
    expect(component.title).toEqual('PageHub');
  });

  it('should inject MessageService', () => {
    const messageService = TestBed.inject(MessageService);
    expect(messageService).toBeTruthy();
  });
});
