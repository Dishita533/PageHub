using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FavoriteService.Models
{
    public class Favorite
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string FavId { get; set; }
        public string UserEmail { get; set; }
        public int Id { get; set; }  // Auto-generated ID for each book entry


        public string Title { get; set; }  // Title of the book


        public string Author { get; set; }  // Author of the book


        public string ImageUrl { get; set; }  // URL for the book's image


        public string Genre { get; set; }  // Genre of the book


        public bool IsFavorite { get; set; }  // Whether the book is marked as favorite

        public string BookType { get; set; }  // Enum for Fiction or Non-Fiction
    }
}
