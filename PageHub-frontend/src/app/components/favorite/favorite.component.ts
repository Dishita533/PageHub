import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule, MatIconModule, MatToolbarModule],
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  favoriteBooks: Book[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.fetchFavoriteBooks();
  }

  fetchFavoriteBooks(): void {
    // Fetch only the books marked as favorite
    this.favoriteBooks = this.bookService.getFavoriteBooks();
    console.log(this.favoriteBooks);
  }
  toggleFavorite(book: Book): void {
    if (book.isFavorite) {
      this.bookService.removeFavorite(book, 'userEmail');
    } else {
      this.bookService.addFavorite(book ,'userEmail');
    }
    book.isFavorite = !book.isFavorite;
    this.fetchFavoriteBooks(); // Refresh the list to remove the book if it is unfavorited
  }

  goToView(): void {
    this.router.navigate(['/view']);
  }
}
