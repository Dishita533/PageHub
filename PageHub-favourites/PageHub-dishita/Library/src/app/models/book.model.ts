// src/app/models/book.model.ts
export interface Book {
    title: string;
    author: string;
    description: string;
    imageUrl: string;
    genre: string;  
    isFavorite: boolean;
    bookType: 'Fiction' | 'Non-Fiction';
  }
  