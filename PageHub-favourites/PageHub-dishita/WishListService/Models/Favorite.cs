using System.ComponentModel.DataAnnotations;
using BookService.Models;
using UserService.Models;

namespace WishListService.Models
{
    public class Favorite
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Email { get; set; } // User email (acts as a unique identifier)

        [Required]
        public int BookId { get; set; } // ID of the book

        // Navigation properties
        //public BookUser User { get; set; }
        public Book Book { get; set; }
    }
}
