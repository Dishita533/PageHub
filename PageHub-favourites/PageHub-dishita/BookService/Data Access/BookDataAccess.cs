using BookService.Models;
using Microsoft.EntityFrameworkCore;

namespace BookService.Data_Access
{
    public class BookDataAccess : IBookDataAccess
    {
        private readonly BookDbcontext _dbcontext;
        public BookDataAccess(BookDbcontext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public void AddBook(Book book)
        {
            _dbcontext.Add(book);
            _dbcontext.SaveChanges();

        }

        public Book GetBook(string genre)
        {
            //find the record and return
            var record = _dbcontext.Books.FirstOrDefault(b => b.Genre == genre);
            if (record != null)
            {
                return record;
            }
            else
            {
                throw new Exception("Record not found");
            }
        }

        public List<Book> GetBooks()
        {
            return _dbcontext.Books.ToList();
        }

        public Book GetBookById(int Id)
        {
            return _dbcontext.Books.FirstOrDefault(b => b.Id == Id);
        }



    }
}
