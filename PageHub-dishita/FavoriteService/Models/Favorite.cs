using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FavoriteService.Models
{
    public class Favorite
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string UserEmail { get; set; }
        public List<Book> FavoriteBook { get; set; }
    }
}
