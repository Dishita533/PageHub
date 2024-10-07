using System.ComponentModel.DataAnnotations;

namespace FavoriteService.Models
{
    public class Book
    {
       
    
            public int Id { get; set; }  // Auto-generated ID for each book entry


            public string Title { get; set; }  // Title of the book


            public string Author { get; set; }  // Author of the book


            public string ImageUrl { get; set; }  // URL for the book's image


            public string Genre { get; set; }  // Genre of the book


            public bool IsFavorite { get; set; }  // Whether the book is marked as favorite

            public string BookType { get; set; }  // Enum for Fiction or Non-Fiction
        }

       
    }
