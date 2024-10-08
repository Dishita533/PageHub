// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { NavbarComponent } from './navbar.component';

// describe('NavbarComponent', () => {
//   let component: NavbarComponent;
//   let fixture: ComponentFixture<NavbarComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [NavbarComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(NavbarComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent], // Use imports for standalone component
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}), // Mocked params observable
            snapshot: {}, // Mocked snapshot if needed
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
