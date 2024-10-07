namespace FavoriteService.Models
{
    public class MongoDbSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string BookCollectionName { get; set; }
        public string BookFavoritesCollectionName { get; set; }
    }
}
