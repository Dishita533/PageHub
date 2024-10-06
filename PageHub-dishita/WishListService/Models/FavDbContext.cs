using BookService.Models;
using Microsoft.EntityFrameworkCore;

namespace WishListService.Models
{
    public class FavDbContext : DbContext
    {
        public FavDbContext(DbContextOptions<FavDbContext> options) : base(options)
        {

        }
        public virtual DbSet<Favorite> Favorites { get; set; }
       
    }

}
        
       

