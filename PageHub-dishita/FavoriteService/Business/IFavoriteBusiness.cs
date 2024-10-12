using FavoriteService.Models;

namespace FavoriteService.Business
{
    public interface IFavoriteBusiness
    { 
    public Favorite AddFavorite(Favorite favorite);
        public Favorite DeleteFavorite(string UserEmail, int Id);
        public Favorite GetFavorite(string UserEmail);
    }
}
