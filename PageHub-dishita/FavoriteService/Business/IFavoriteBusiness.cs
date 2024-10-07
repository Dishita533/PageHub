using FavoriteService.Models;

namespace FavoriteService.Business
{
    public interface IFavoriteBusiness
    {
        Task<List<Book>> GetAllBookAsync();
        Task<Book> AddToFavoritesAsync(string userEmail, Book book);
        Task<List<Book>> GetUserFavoritesAsync(string userEmail);
        Task RemoveBookAsync(string userEmail, int id);
    }
}
