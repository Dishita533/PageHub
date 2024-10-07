import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

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
      this.bookService.removeFavorite(book, 'userEmail');
    } else {
      // If the book is not a favorite, add it to favorites
      this.bookService.addFavorite(book, 'userEmail');
    }
    // Toggle the favorite status
    book.isFavorite = !book.isFavorite;
  
    // Update the list of favorites in the FavoritesComponent
    this.bookService.updateFavoritesList();
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

  // applyFilterAndPagination(): void {
  //   let filtered = this.books;
  //   if (this.searchGenre) {
  //     filtered = this.books.filter(book =>
  //       book.genre.toLowerCase().includes(this.searchGenre.toLowerCase())
  //     );
  //   }
  //   this.totalBooks = filtered.length;
  //   const startIndex = this.currentPage * this.pageSize;
  //   this.filteredBooks = filtered.slice(startIndex, startIndex + this.pageSize);
  // }
  applyFilterAndPagination(): void {
    let filtered = this.books;
  
    if (this.searchGenre) {
      const searchValue = this.searchGenre.toLowerCase();
  
      filtered = this.books.filter(book =>
        book.genre.toLowerCase().includes(searchValue) ||  // Search by genre
        book.title.toLowerCase().includes(searchValue) ||  // Search by title (book name)
        book.author.toLowerCase().includes(searchValue) ||  // Search by author
        book.bookType.toLowerCase().includes(searchValue)  // Search by type (fiction/non-fiction)
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
