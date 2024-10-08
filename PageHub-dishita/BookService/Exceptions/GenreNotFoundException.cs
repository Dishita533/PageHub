namespace BookService.Exceptions
{
    public class GenreNotFoundException : Exception
    {
        public GenreNotFoundException(string message) : base(message) 
        {
            
        }
    }
}
