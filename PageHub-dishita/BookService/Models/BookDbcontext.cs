using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BookService.Models
{
    public partial class BookDbcontext : DbContext
    {
        public BookDbcontext(DbContextOptions<BookDbcontext> options) : base (options)
        {
            
        }
        public virtual DbSet<Book> Books { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>()
                .Property(b => b.BookType)
                .HasConversion<string>();  // Converts the enum to a string in the database
        }
    }
}
