import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchGenre: string = '';
  pageSize: number = 10;
  totalBooks: number = 0;
  currentPage: number = 0;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.bookService.getBooks().subscribe(
      (data: Book[]) => {
        this.books = data;

        // Set the favorite status based on the service
        this.books.forEach(book => {
          book.isFavorite = this.bookService.isBookFavorite(book);
        });

        this.totalBooks = this.books.length;
        this.applyFilterAndPagination();
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  // toggleFavorite(book: Book): void {
  //   book.isFavorite = !book.isFavorite;
  // }
  toggleFavorite(book: Book): void {
    if (book.isFavorite) {
      // If the book is already a favorite, remove it
      this.bookService.removeFavorite(book);
    } else {
      // If the book is not a favorite, add it to favorites
      this.bookService.addFavorite(book);
    }
    // Toggle the favorite status
    book.isFavorite = !book.isFavorite;
  }

  onSearchChange(): void {
    this.currentPage = 0;
    this.applyFilterAndPagination();
  }

  clearSearch(): void {
    this.searchGenre = '';
    this.onSearchChange();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyFilterAndPagination();
  }

  applyFilterAndPagination(): void {
    let filtered = this.books;
    if (this.searchGenre) {
      filtered = this.books.filter(book =>
        book.genre.toLowerCase().includes(this.searchGenre.toLowerCase())
      );
    }
    this.totalBooks = filtered.length;
    const startIndex = this.currentPage * this.pageSize;
    this.filteredBooks = filtered.slice(startIndex, startIndex + this.pageSize);
  }
  goToFavorite(): void {
    this.router.navigate(['/favorite']);
  }

}
