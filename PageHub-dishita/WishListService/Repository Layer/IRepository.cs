using WishListService.Models;

namespace WishListService.Repository_Layer

{
    public interface IRepository
    {
        void AddFavorite(string userEmail, int bookId);  // Add a favorite book
        List<int> GetFavoritesByUser(string userEmail);  // Get favorite book IDs by user
        void RemoveFavorite(string userEmail, int bookId);
    }
}

