// // import { ComponentFixture, TestBed } from '@angular/core/testing';

// // import { FavoriteComponent } from './favorite.component';

// // describe('FavoriteComponent', () => {
// //   let component: FavoriteComponent;
// //   let fixture: ComponentFixture<FavoriteComponent>;

// //   beforeEach(async () => {
// //     await TestBed.configureTestingModule({
// //       imports: [FavoriteComponent]
// //     })
// //     .compileComponents();
    
// //     fixture = TestBed.createComponent(FavoriteComponent);
// //     component = fixture.componentInstance;
// //     fixture.detectChanges();
// //   });

// //   it('should create', () => {
// //     expect(component).toBeTruthy();
// //   });
// // });

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FavoriteComponent } from './favorite.component';
// import { BookService } from '../../services/book.service';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Book } from '../../models/book.model';

// describe('FavoriteComponent', () => {
//   let component: FavoriteComponent;
//   let fixture: ComponentFixture<FavoriteComponent>;
//   let bookService: jasmine.SpyObj<BookService>;
//   let router: jasmine.SpyObj<Router>;

//   beforeEach(async () => {
//     const bookServiceSpy = jasmine.createSpyObj('BookService', ['getFavoriteBooks', 'addFavorite', 'removeFavorite']);
//     const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

//     await TestBed.configureTestingModule({
//       imports: [FavoriteComponent, RouterTestingModule],
//       providers: [
//         { provide: BookService, useValue: bookServiceSpy },
//         { provide: Router, useValue: routerSpy }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(FavoriteComponent);
//     component = fixture.componentInstance;
//     bookService = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
//     router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

//     // Adjusted mock data based on the Book interface
//     const mockBooks: Book[] = [
//       {
//         title: 'Book 1',
//         author: 'Author 1',
//         description: 'Description 1',
//         imageUrl: 'http://example.com/image1.jpg',
//         genre: 'Fiction',
//         isFavorite: true,
//         bookType: 'Fiction',
//       },
//       {
//         title: 'Book 2',
//         author: 'Author 2',
//         description: 'Description 2',
//         imageUrl: 'http://example.com/image2.jpg',
//         genre: 'Non-Fiction',
//         isFavorite: false,
//         bookType: 'Non-Fiction',
//       },
//     ];

//     bookService.getFavoriteBooks.and.returnValue(mockBooks);
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should fetch favorite books on init', () => {
//     component.ngOnInit();
//     expect(component.favoriteBooks).toEqual(bookService.getFavoriteBooks());
//     expect(bookService.getFavoriteBooks).toHaveBeenCalled();
//   });

//   it('should toggle favorite status of a book', () => {
//     // Set up a valid book object
//     const book: Book = { 
//       title: 'Book 1', 
//       author: 'Author 1', 
//       description: 'Description 1', 
//       imageUrl: 'http://example.com/image1.jpg', 
//       genre: 'Fiction', 
//       isFavorite: true, 
//       bookType: 'Fiction' 
//     };
  
//     // Assign the mock book to favoriteBooks
//     component.favoriteBooks = [book]; 
  
//     // Call toggleFavorite
//     component.toggleFavorite(book);
    
//     // Check that removeFavorite was called
//     expect(bookService.removeFavorite).toHaveBeenCalledWith(book);
//     expect(book.isFavorite).toBeFalse(); // Verify that the book is no longer a favorite
  
//     // Toggle back
//     component.toggleFavorite(book); // Call it again to toggle it back
    
//     // Check that addFavorite was called
//     expect(bookService.addFavorite).toHaveBeenCalledWith(book);
//     expect(book.isFavorite).toBeTrue(); // Verify that the book is now a favorite again
//   });
  

//   it('should navigate to view on goToView call', () => {
//     component.goToView();
//     expect(router.navigate).toHaveBeenCalledWith(['/view']);
//   });
// });
