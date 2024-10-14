using BookService.Business;
using BookService.Models;
using UserService.SeviceLayer;
using WishListService.Models;
using WishListService.Repository_Layer;
namespace WishListService.Service_Layer
{
    public class Service : IService
    {
        private readonly IRepository _favoriteRepository;
        //private readonly IBookBusiness _bookBusiness;  // Call BookService API to get book details

        public Service(IRepository favoriteRepository)
        {
            _favoriteRepository = favoriteRepository;
            
        }

        public List<Favorite> RemoveFavorite(string userEmail, int bookId)
        {
           return _favoriteRepository.RemoveFavorite(userEmail, bookId);
        }

        public List<Favorite> AddFavorite(Favorite favorite)
        {
            return _favoriteRepository.AddFavorite(favorite);
        }

        // Retrieves all favorite book IDs for a specific user
        public List<Favorite> GetFavoritesByUser(string userEmail)
        {
            return _favoriteRepository.GetFavoritesByUser(userEmail);
        }
    }
}

