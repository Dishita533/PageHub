import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { login } from '../models/login.model';
import { User } from '../interfaces/auth';
import { AuthService } from './auth.service';
import { Favorite } from '../models/Favorite.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  

  // private apiUrl = 'http://localhost:3000/books'; // Fake API URL
 private BookUrl = 'http://localhost:5022/GetAllBooks';
  // private apiUrl='http://localhost:5210/api/Favorite/favorites';
  private apiUrl1='http://localhost:5210/api/Favorite/favorites/add';
  private apiUrl2='http://localhost:5210/api/Favorite/favorites/remove';
  private favoriteBooks: Book[] = []; // To store favorite books
  private loginBook :User[] =[];
  private favoriteBooksSubject = new BehaviorSubject<Book[]>([]);
  constructor(private http: HttpClient, private authService: AuthService) {}

  // Fetch all books from the API
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.BookUrl);
  }

 // Add a book to the favorites list
 // Add a book to the favorites list by making an HTTP POST request

updateFavoritesList(): void {
  this.favoriteBooksSubject.next(this.favoriteBooks);
}

 // Add a book to the favorites list
 addFavorite(book: Book):void {
  if (!this.favoriteBooks.some(b => b.title === book.title)) {
    this.favoriteBooks.push(book);
    book.isFavorite = true; // Mark as favorite
  }
  // return this.http.post(this.apiUrl1,favorite);
}

// Remove a book from the favorites list
removeFavorite(book: Book): void {
  const index = this.favoriteBooks.findIndex(b => b.title === book.title);
  if (index !== -1) {
    this.favoriteBooks.splice(index, 1);
    book.isFavorite = false; // Unmark as favorite
  }
}



  // Get the list of favorite books
  getFavoriteBooks(): Book[] {
    return this.favoriteBooks;
  }

  isBookFavorite(book: Book): boolean {
    return this.favoriteBooks.some(b => b.title === book.title);
  }
}
