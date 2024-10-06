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
       /* protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>()
                .Property(b => b.BookType)
                .HasConversion<string>();  // Converts the enum to a string in the database

        }*/
    }

}
        
       

