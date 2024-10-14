using System.ComponentModel.DataAnnotations;

namespace BookService.Models
{
    public class Book
    {
        [Key]  // Primary Key
        public int Id { get; set; }  // Auto-generated ID for each book entry

        [Required]
        [MaxLength(255)]
        public string Title { get; set; }  // Title of the book

        [Required]
        [MaxLength(255)]
        public string Author { get; set; }  // Author of the book

        [Required]
        /*[MaxLength(500)]*/
        public string ImageUrl { get; set; }  // URL for the book's image

        [Required]
        [MaxLength(100)]
        public string Genre { get; set; }  // Genre of the book

        [Required]
        public bool IsFavorite { get; set; }  // Whether the book is marked as favorite

        [Required]
        public string BookType { get; set; }  // Enum for Fiction or Non-Fiction
    }

   /* public enum BookType
    {
        Fiction,
        NonFiction
    
}*/
}
