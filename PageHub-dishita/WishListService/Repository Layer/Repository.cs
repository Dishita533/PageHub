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
            _context = _context;
        }
        public void AddFavorite(string userEmail, int bookId)
        {
            var favorite = new Favorite
            {
                Email = userEmail,
                BookId = bookId
            };

            _context.Favorites.Add(favorite);
            _context.SaveChanges();
        }

        public List<int> GetFavoritesByUser(string userEmail)
        {
            return _context.Favorites
                .Where(f => f.Email == userEmail)
                .Select(f => f.BookId)
                .ToList();
        }
        public void RemoveFavorite(string userEmail, int bookId)
        {
            var favorite = _context.Favorites
                .FirstOrDefault(f => f.Email == userEmail && f.Book.Id == bookId);

            if (favorite != null)
            {
                _context.Favorites.Remove(favorite);
                _context.SaveChanges();
            }
        }
    }
}
