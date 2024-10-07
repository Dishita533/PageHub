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

        public async Task<List<Book>> GetAllBookAsync()
        {
            return await _context.BookCollection.Find(m => true).ToListAsync();
        }

        public async Task<Book> AddToFavoritesAsync(string userEmail, Book book)
        {
            // Find the user's favorites
            var userFavorites = await _context.BookFavoritesCollection
                .Find(fav => fav.UserEmail == userEmail)
                .FirstOrDefaultAsync();

            if (userFavorites == null)
            {
                // If no favorites exist for the user, create a new one
                userFavorites = new Favorite
                {
                    UserEmail = userEmail,
                    FavoriteBook = new List<Book> { book }
                };
                await _context.BookFavoritesCollection.InsertOneAsync(userFavorites);
            }
            else
            {
                // Check if the song already exists in the user's favorites
                bool bookExists = userFavorites.FavoriteBook.Any(m => m.Id == book.Id);

                if (bookExists)
                {
                    throw new InvalidOperationException("This song is already in your favorites.");
                }

                // Add the song to the favorites
                userFavorites.FavoriteBook.Add(book);
                await _context.BookFavoritesCollection.ReplaceOneAsync(fav => fav.UserEmail == userEmail, userFavorites);
            }

            return book;
        }

        public async Task<List<Book>> GetUserFavoritesAsync(string userEmail)
        {
            var userFavorites = await _context.BookFavoritesCollection.Find(fav => fav.UserEmail == userEmail).FirstOrDefaultAsync();

            if (userFavorites == null)
            {
                throw new UserNotFoundException($"User with Email {userEmail} not found.");
            }

            return userFavorites.FavoriteBook;
        }

        public async Task RemoveBookAsync(string userEmail, int id)
        {
            var userFavorites = await _context.BookFavoritesCollection.Find(fav => fav.UserEmail == userEmail).FirstOrDefaultAsync();

            if (userFavorites == null)
            {
                throw new UserNotFoundException($"User with Email {userEmail} not found.");
            }

            var bookToRemove = userFavorites.FavoriteBook.FirstOrDefault(m => m.Id == id);
            if (bookToRemove == null)
            {
                throw new BookNotFoundException($"Music with ID {id} not found in the user's favorites.");
            }

            userFavorites.FavoriteBook.RemoveAll(m => m.Id == id);
            await _context.BookFavoritesCollection.ReplaceOneAsync(fav => fav.UserEmail == userEmail, userFavorites);
        }
    }
}

