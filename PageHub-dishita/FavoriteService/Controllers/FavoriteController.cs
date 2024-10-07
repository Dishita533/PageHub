using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FavoriteService.Business;
using FavoriteService.Models;
using FavoriteService.Exceptions;
namespace FavoriteService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteBusiness _favoritebusiness;

        public FavoriteController(IFavoriteBusiness favoritebusiness)
        {
            _favoritebusiness = favoritebusiness;
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAllBook()
        {
            var book = await _favoritebusiness.GetAllBookAsync();
            return Ok(book);
        }

        [HttpPost("favorites/add/{userEmail}")]
        public async Task<IActionResult> AddToFavorites(string userEmail, [FromBody] Book book)
        {
            try
            {
                var addedBook = await _favoritebusiness.AddToFavoritesAsync(userEmail, book);
                return Ok(addedBook);
            }
            catch (InvalidOperationException ex)
            {
                // If the song already exists, return a conflict status code with the error message
                return Conflict(new { message = ex.Message });
            }
        }

        [HttpGet("favorites/{userEmail}")]
        public async Task<IActionResult> GetUserFavorites(string userEmail)
        {
            try
            {
                var favorites = await _favoritebusiness.GetUserFavoritesAsync(userEmail);
                return Ok(favorites);
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }

        [HttpDelete("favorites/remove/{userEmail}/{id}")]
        public async Task<IActionResult> RemoveFromFavorites(string userEmail, int id)
        {
            try
            {
                await _favoritebusiness.RemoveBookAsync(userEmail, id);
                return NoContent();
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (BookNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }
    }
}
