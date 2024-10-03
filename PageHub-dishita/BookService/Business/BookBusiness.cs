using BookService.Models;
using BookService.Repository;

namespace BookService.Business
{
    public class BookBusiness : IBookBusiness
    {
        private readonly IBookRepository repository;
        public BookBusiness(IBookRepository repo)
        {
            this.repository = repo;
        }
        public void AddBook(Book book)
        {
            repository.AddBook(book);
        }

        public Book GetBook(string Genre)
        {
            return repository.GetBook(Genre);
        }

        public List<Book> GetBooks()
        {
            return repository.GetBooks();
        }
    }
}
