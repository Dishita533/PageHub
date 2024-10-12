using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FavoriteService.Business;
using FavoriteService.Models;
using FavoriteService.Exceptions;
using System.Threading.Tasks;

namespace FavoriteService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteBusiness _favoriteBusiness;

        public FavoriteController(IFavoriteBusiness favoriteBusiness)
        {
            _favoriteBusiness = favoriteBusiness;
        }

        // Get all favorite books of a specific user
        [HttpGet("favorites/{userEmail}")]
        public IActionResult GetUserFavorites(string userEmail)
        {
            try
            {
                var favorites = _favoriteBusiness.GetFavorite(userEmail);
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

        // Add a book to the user's favorites
        [HttpPost("favorites/add")]
        public IActionResult AddToFavorites([FromBody] Favorite favorite)
        {
            try
            {
                var addedFavorite = _favoriteBusiness.AddFavorite(favorite);
                return Ok(addedFavorite);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }

        // Remove a book from the user's favorites
        [HttpDelete("favorites/remove/{userEmail}/{id}")]
        public IActionResult RemoveFromFavorites(string userEmail, int id)
        {
            try
            {
                var deletedFavorite = _favoriteBusiness.DeleteFavorite(userEmail, id);
                return Ok(deletedFavorite);
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
    }
}
