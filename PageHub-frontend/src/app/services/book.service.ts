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
  private apiUrl1='http://localhost:5210/api/Favorite/favorites/add/';
  private url='http://localhost:5022/AddFavorites/{UserEmail}'
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
 
addtoFavorite(book: Favorite) {
  const token = sessionStorage.getItem('token');
    
  // Add the Bearer token to the headers
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.post(`http://localhost:5022/AddFavorites/${book.UserEmail}`,book);
   //return this.http.post(this.apiUrl1,book);
}
getAllFavorite(email:any){
  ///RemoveFavorites/{UserEmail GetFavorites
  return this.http.get<Favorite[]>(`http://localhost:5022/GetFavorites/${email}`);
  //return this.http.get<Favorite[]>(`http://localhost:5210/api/Favorite/favorites/${email}`);
}


// Remove a book from the favorites list

removefromFavorite(id:number,email:any){
  const token = sessionStorage.getItem('token');
    
  // Add the Bearer token to the headers
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.delete(`http://localhost:5022/RemoveFavorites/${email}/${id}`,{headers});
 // return this.http.delete(`http://localhost:5210/api/Favorite/favorites/remove/${email}/${id}`,{headers});
}



  // Get the list of favorite books
  getFavoriteBooks(): Book[] {
    return this.favoriteBooks;
  }

  isBookFavorite(book: Book): boolean {
    return this.favoriteBooks.some(b => b.title === book.title);
  }
}
