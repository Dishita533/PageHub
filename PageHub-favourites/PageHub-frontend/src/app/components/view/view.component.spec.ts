import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewComponent } from './view.component';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { of } from 'rxjs'; // Import of to create observable
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let bookService: jasmine.SpyObj<BookService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const bookServiceSpy = jasmine.createSpyObj('BookService', ['getBooks']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ViewComponent, HttpClientModule, BrowserAnimationsModule], // Add BrowserAnimationsModule here
      providers: [
        { provide: BookService, useValue: bookServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Mock the return value of getBooks
    bookService.getBooks.and.returnValue(of([])); // Return an observable of an empty array

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
