namespace FavoriteService.Exceptions
{
    public class BookNotFoundException : Exception
    {
        public BookNotFoundException() : base("Music not found.") { }

        public BookNotFoundException(string message) : base(message) { }

        public BookNotFoundException(string message, Exception inner) : base(message, inner) { }

    
    }
}
