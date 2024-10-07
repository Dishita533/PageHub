using BookService.Models;
using WishListService.Models;

namespace WishListService.Service_Layer
{
    public interface IService
    {
        List<Favorite> AddFavorite(Favorite favorite);  // Add a favorite book
        List<Favorite> GetFavoritesByUser(string userEmail);  // Get favorite book IDs by user
        List<Favorite> RemoveFavorite(string userEmail, int bookId);
    }
}
