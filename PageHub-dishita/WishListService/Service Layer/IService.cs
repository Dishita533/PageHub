using BookService.Models;
using WishListService.Models;

namespace WishListService.Service_Layer
{
    public interface IService
    {
        void AddFavorite(string userEmail, int bookId);
        List<int> GetFavoritesByUser(string userEmail);
        void RemoveFavorite(string userEmail, int bookId);
    }
}
