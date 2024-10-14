using BookService.Data_Access;
using BookService.Models;

namespace BookService.Repository
{
    public class BookRepository : IBookRepository
    {
        private readonly IBookDataAccess dataAccess;
        public BookRepository(IBookDataAccess bookDataAccess)
        {
            this.dataAccess = bookDataAccess;
        }
        public void AddBook(Book book)
        {
            dataAccess.AddBook(book);
        }
        public List<Book> GetBooks()
        {
            return dataAccess.GetBooks();
        }
        public Book GetBook(string Genre)
        {
            return dataAccess.GetBook(Genre);
        }
        public Book GetBookById(int Id)
        {
            return dataAccess.GetBookById(Id);
        }
    }
}
