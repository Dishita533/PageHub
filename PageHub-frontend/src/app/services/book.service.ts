import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  

  // private apiUrl = 'http://localhost:3000/books'; // Fake API URL
 // private apiUrl = 'http://localhost:5033/api/Book/GetAllBooks';
  private apiUrl='http://localhost:5022/GetAllBooks';
  private favoriteBooks: Book[] = []; // To store favorite books
  private favoriteBooksSubject = new BehaviorSubject<Book[]>([]);
  constructor(private http: HttpClient) {}

  // Fetch all books from the API
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

 // Add a book to the favorites list
addFavorite(book: Book): void {
  if (!this.favoriteBooks.some(b => b.title === book.title)) {
    this.favoriteBooks.push(book);
    book.isFavorite = true; // Mark as favorite
    this.updateFavoritesList();
  }
}

// Remove a book from the favorites list
removeFavorite(book: Book): void {
  const index = this.favoriteBooks.findIndex(b => b.title === book.title);
  if (index !== -1) {
    this.favoriteBooks.splice(index, 1);
    book.isFavorite = false; // Unmark as favorite
    this.updateFavoritesList();
  }
  
}
updateFavoritesList(): void {
  this.favoriteBooksSubject.next(this.favoriteBooks);
}



  // Get the list of favorite books
  getFavoriteBooks(): Book[] {
    return this.favoriteBooks;
  }

  isBookFavorite(book: Book): boolean {
    return this.favoriteBooks.some(b => b.title === book.title);
  }
}
