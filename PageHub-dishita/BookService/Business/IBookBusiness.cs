using BookService.Models;

namespace BookService.Business
{
    public interface IBookBusiness
    {

        List<Book> GetBooks();
        Book GetBook(string Genre);
        void AddBook(Book book);
        Book GetBookById(int Id);
    }
}
