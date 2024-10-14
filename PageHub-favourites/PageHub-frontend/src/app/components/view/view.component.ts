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
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Favorite } from '../../models/Favorite.model';

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
  fav : Favorite = new Favorite();
  pageSize: number = 10;
  totalBooks: number = 0;
  currentPage: number = 0;
  email:string| null = null;
  isLoggedIn:boolean=false;
  constructor(private route: ActivatedRoute,private bookService: BookService,private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.fetchBooks();
    this.email = localStorage.getItem('email');
    this.route.paramMap.subscribe(params => {
      const genreFromRoute = params.get('genreName');
      if (genreFromRoute) {
        this.searchGenre = genreFromRoute;  // Set the search genre based on route param
      }
      this.fetchBooks();  // Fetch and filter the books based on genre
    });
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
  // 
  addtoFav(book:Book){
    
    if (book.isFavorite) {
      
      this.snackBar.open('You need to log in to add books to favorites!', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }
    
    this.fav.UserEmail=localStorage.getItem('email')||'';
    this.fav.author=book.author
    this.fav.bookType=book.bookType
    this.fav.genre=book.genre
    this.fav.id=book.id
    this.fav.FavId=''
    this.fav.imageUrl=book.imageUrl
    this.fav.description=book.description
    this.fav.title=book.title
    this.fav.isFavorite=book.isFavorite
    // this.bookService.addtoFavorite(this.fav).subscribe(
    //   data=>
    //   {
    //     this.fav=data
    //     console.log(this.fav)
    //   }
   // )
   
   this.bookService.addtoFavorite(this.fav).subscribe(
    (data) => {
      book.isFavorite = true;  // Update UI on success
      this.snackBar.open('Added to Favorites!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    },
  
    (error) => {
      console.error('Error adding to favorites:', error);
    }
  );

  }
  // toggleFavorite(book: any) {
  //   // Check if the user is logged in
  //   if (!this.isLoggedIn) {
  //     this.snackBar.open('You need to log in to add books to favorites!', 'Close', {
  //       duration: 3000, // Message duration in milliseconds
  //       panelClass: ['error-snackbar'] // Custom CSS class for styling
  //     });
  //     return; // Stop further execution if not logged in
  //   }

  //   // Logic to toggle favorite
  //   book.isFavorite = !book.isFavorite;

  //   if (book.isFavorite) {
  //     // Additional logic for adding to favorites
  //     this.snackBar.open('Added to Favorites!', 'Close', {
  //       duration: 3000,
  //       panelClass: ['success-snackbar']
  //     });
  //   } else {
  //     // Additional logic for removing from favorites
  //     this.snackBar.open('Removed from Favorites!', 'Close', {
  //       duration: 3000,
  //       panelClass: ['info-snackbar']
  //     });
  //   }
  // }
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
