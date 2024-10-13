import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Favorite } from '../../models/Favorite.model';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule, MatIconModule, MatToolbarModule],
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  book: Favorite[]=[];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.getFavorites()
  }
  getFavorites(){
   let  email= localStorage.getItem('email')||null
   this.bookService.getAllFavorite(email).subscribe(
    data=>{
      this.book=data
      console.log(this.book)
      console.log(data)
    }
   )
  }
  
  
  // toggleFavorite(book: Favorite): void {
  //   if (book.isFavorite) {
  //     this.bookService.removefromFavorite(book.id=0,book.UserEmail);
  //   } else {
  //     this.bookService.addtoFavorite(book);
  //   }
  //   book.isFavorite = !book.isFavorite;
  //   this.fetchFavoriteBooks(); // Refresh the list to remove the book if it is unfavorited
  // }
  removeFavorite(id:any){
    let  email= localStorage.getItem('email')||null
    this.bookService.removefromFavorite(id,email).subscribe(
      data=>{
        console.log(data)
      }
    )
  }
  goToView(): void {
    this.router.navigate(['/view']);
  }
}
