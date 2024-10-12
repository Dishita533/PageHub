using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace FavoriteService.Models
{
    public class FavoriteDbContext
    {
        private readonly IMongoDatabase _database;

        public FavoriteDbContext(IOptions<MongoDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);
        }

        

        // Access to UserFavorites collection
        public IMongoCollection<Favorite> BookFavoritesCollection =>
            _database.GetCollection<Favorite>(nameof(Favorite));
    }
}
