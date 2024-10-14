using BookService.Business;
using BookService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using BookService.Exceptions;

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
            /*var books = bookBusiness.GetBooks();
            if (books == null || !books.Any())
            {
                return NotFound("No books found.");
            }
            return Ok(books);*/
            try
            {
                var books = bookBusiness.GetBooks();
                if (books == null || !books.Any())
                {
                    return NotFound("No books found.");
                }
                return Ok(books);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }
        // Get book by genre
        [HttpGet]
        [Route("GetBookbyGenre/{Genre}")]
        public IActionResult GetBookbyGenre(string Genre)
        {
            /*var book = bookBusiness.GetBook(Genre);
            if (book == null)
            {
                return NotFound($"No book found for the genre: {Genre}");
            }
            return Ok(book);*/

            try
            {
                var book = bookBusiness.GetBook(Genre);
                if (book == null)
                {
                    throw new GenreNotFoundException($"No book found for the genre: {Genre}");
                }
                return Ok(book);
            }
            catch (GenreNotFoundException ex)
            {
                return NotFound(ex.Message); // Custom 404 for genre not found
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }
        // Add a new book
        [HttpPost]
        [Route("AddBook")]
        public IActionResult AddBooks([FromBody] Book book)
        {
            /* if (book == null)
             {
                 return BadRequest("Book data is null.");
             }

             bookBusiness.AddBook(book);
             return CreatedAtAction(nameof(GetAllBooks), new { Genre = book.Genre }, book); // Returns 201 Created with the new resource's location
        */
            try
            {
                if (book == null)
                {
                    return BadRequest("Book data is null.");
                }

                bookBusiness.AddBook(book);
                return CreatedAtAction(nameof(GetAllBooks), new { Genre = book.Genre }, book); // Returns 201 Created with the new resource's location
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet]
        [Route("GetBookbyId/{bookId}")]
        public IActionResult GetBookById(int bookId)
        {
            try
            {
                var book = bookBusiness.GetBookById(bookId);
                if (book == null)
                {
                    throw new BookNotFoundException($"Book with ID {bookId} not found.");
                }
                return Ok(book);
            }
            catch (BookNotFoundException ex)
            {
                return NotFound(ex.Message); // Custom 404 for book not found
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }
    }
    }



    
