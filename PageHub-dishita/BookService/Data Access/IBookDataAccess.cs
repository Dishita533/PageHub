using BookService.Models;

namespace BookService.Data_Access
{
    public interface IBookDataAccess
    {
        List<Book> GetBooks();
        Book GetBook(string Genre);
        void AddBook(Book book);
        Book GetBookById(int Id);


    }
}
