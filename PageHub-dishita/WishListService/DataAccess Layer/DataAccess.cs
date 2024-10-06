using Microsoft.EntityFrameworkCore;
using WishListService.Models;

namespace WishListService.DataAccess_Layer
{
    public class DataAccess : IDataAccess
    {
        private readonly FavDbContext favdb;
        public DataAccess(FavDbContext favdb)
        {
            this.favdb = favdb;
        }
        public void AddToFavorites(string email, int id)
        {
            /*throw new NotImplementedException();*/
            var existingFavorite = favdb.Favorites
        .FirstOrDefault(f => f.Email == email && f.BookId == id);
        }
    }
}
