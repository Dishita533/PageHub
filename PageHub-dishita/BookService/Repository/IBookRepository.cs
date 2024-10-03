using BookService.Models;
namespace BookService.Repository
{
    public interface IBookRepository
    {
        List<Book> GetBooks();
        Book GetBook(string Genre);
        void AddBook(Book book);
    }
}
