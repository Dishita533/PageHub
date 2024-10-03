using BookService.Business;
using BookService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace BookService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase { 


        private readonly IBookBusiness bookBusiness;
        public BookController(IBookBusiness business)
        {
            this.bookBusiness = business;
            
        }
        [HttpGet]
        [Route("GetAllBooks")]
        public IActionResult GetAllBooks()
        {
            var books = bookBusiness.GetBooks();
            if (books == null || !books.Any())
            {
                return NotFound("No books found.");
            }
            return Ok(books);
        }
        // Get book by genre
        [HttpGet]
        [Route("GetBookbyGenre/{Genre}")]
        public IActionResult GetBookbyGenre(string Genre)
        {
            var book = bookBusiness.GetBook(Genre);
            if (book == null)
            {
                return NotFound($"No book found for the genre: {Genre}");
            }
            return Ok(book);
        }
        // Add a new book
        [HttpPost]
        [Route("AddBook")]
        public IActionResult AddBooks([FromBody] Book book)
        {
            if (book == null)
            {
                return BadRequest("Book data is null.");
            }

            bookBusiness.AddBook(book);
            return CreatedAtAction(nameof(GetAllBooks), new { Genre = book.Genre }, book); // Returns 201 Created with the new resource's location
        }
    }

}
    
