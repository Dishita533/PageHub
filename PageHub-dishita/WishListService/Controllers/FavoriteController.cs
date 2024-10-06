﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WishListService.Service_Layer;

namespace WishListService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly IService _favoriteService;
        public FavoriteController(IService favoriteService)
        {
            this._favoriteService = favoriteService;
        }
        [HttpPost]
        [Route("/AddToFavourites")]
        public IActionResult AddToFavorites([FromQuery] string userEmail, [FromQuery] int bookId)
        {
            _favoriteService.AddFavorite(userEmail, bookId);
            return Ok(new { message = "Book added to favorites." });
        }

        // GET: api/Favorite/GetFavoritesByUser/{email}
        [HttpGet]
        [Route("/GetFavoritesByUser/{email}")]
        public IActionResult GetFavoritesByUser(string email)
        {
            List<int> favoriteBookIds = _favoriteService.GetFavoritesByUser(email);
            if (favoriteBookIds == null || favoriteBookIds.Count == 0)
            {
                return NotFound(new { message = "No favorite books found for this user." });
            }
            return Ok(favoriteBookIds);
        }
        [HttpDelete]
        [Route("/RemoveFromFavourites")]
        public IActionResult RemoveFromFavorites([FromQuery] string userEmail, [FromQuery] int bookId)
        {
            _favoriteService.RemoveFavorite(userEmail, bookId);
            return Ok(new { message = "Book removed from favorites." });
        }
    }
}

