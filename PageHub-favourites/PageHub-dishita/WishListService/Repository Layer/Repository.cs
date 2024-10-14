using BookService.Models;
using Microsoft.EntityFrameworkCore;
using WishListService.Models;

namespace WishListService.Repository_Layer
{
    public class Repository : IRepository
    {
        private readonly FavDbContext _context;

        public Repository(FavDbContext _context)
        {
            _context = _context ?? throw new ArgumentNullException(nameof(_context));
        }
        public List<Favorite> AddFavorite(Favorite favorite)
        {
            /* var favorite = new Favorite
             {
                 Email = userEmail,
                 BookId = bookId
             };*/
            if (favorite == null)
            {
                throw new ArgumentNullException(nameof(favorite));
            }
            _context.Favorites.Add(favorite);
            _context.SaveChanges();
            return _context.Favorites.ToList();
        }

        public List<Favorite> GetFavoritesByUser(string userEmail)
        {
            return _context.Favorites.Where(f => f.Email == userEmail).ToList();
        }
        public List<Favorite> RemoveFavorite(string userEmail, int bookId)
        {
            var favorite = _context.Favorites
                .FirstOrDefault(f => f.Email == userEmail && f.Book.Id == bookId);

            if (favorite != null)
            {
                _context.Favorites.Remove(favorite);
                _context.SaveChanges();
            }
            return _context.Favorites.ToList();
        }
    }
}
