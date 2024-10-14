using FavoriteService.Models;
using MongoDB.Driver;
using FavoriteService.Exceptions;
namespace FavoriteService.Business
{
    public class FavoriteBusiness : IFavoriteBusiness
    {
        private readonly FavoriteDbContext _context;

        public FavoriteBusiness(FavoriteDbContext context)
        {
            _context = context;
        }

        public Favorite AddFavorite(Favorite favorite)
        {
            // Check if the book is already in the user's favorite list
            var existingFavorite = _context.BookFavoritesCollection
                .Find(fav => fav.UserEmail == favorite.UserEmail && fav.Id == favorite.Id)
                .FirstOrDefault();

            if (existingFavorite != null)
            {
                throw new Exception("This book is already in the user's favorites.");
            }

            // Insert the new favorite book
            _context.BookFavoritesCollection.InsertOne(favorite);

            return favorite;
        }


        public Favorite DeleteFavorite(string userEmail, int id)
        {
            // Find and delete the favorite
            var result = _context.BookFavoritesCollection
                .FindOneAndDelete(fav => fav.UserEmail == userEmail && fav.Id == id);

            if (result == null)
            {
                throw new UserNotFoundException("The specified favorite book was not found for the user.");
            }

            return result;
        }



        public List<Favorite> GetFavorite(string userEmail)
        {
            List<Favorite> favorites = _context.BookFavoritesCollection
                .Find(fav => fav.UserEmail == userEmail).ToList(); // Get all favorites for the user
            Console.WriteLine($"Number of favorites found: {favorites.Count}");

            if (favorites == null || !favorites.Any())
            {
                throw new UserNotFoundException("No favorite books found for this user.");
            }

            return favorites; // Return the list of favorites
        }

    }
}

