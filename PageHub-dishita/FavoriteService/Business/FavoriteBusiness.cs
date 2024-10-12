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


        public Favorite GetFavorite(string userEmail)
        {
            var favorite = _context.BookFavoritesCollection
                .Find(fav => fav.UserEmail == userEmail)
                .FirstOrDefault();

            if (favorite == null)
            {
                throw new UserNotFoundException("No favorite books found for this user.");
            }

            return favorite;
        }

    }
}

