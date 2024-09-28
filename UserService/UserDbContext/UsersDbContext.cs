using Microsoft.EntityFrameworkCore;
using System.Net;
using UserService.Models;

namespace UserService.UserDbContext
{
    public class UsersDbContext:DbContext
    {
        public DbSet<BookUser> Users { get; set; }
        public UsersDbContext(DbContextOptions options):base(options)
        {
            Database.EnsureCreated();
        }
       
    }
}
