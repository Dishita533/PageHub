using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using UserService.Exceptions;
using UserService.Models;
using UserService.SeviceLayer;
using UserService.SeviceLayer.TokenGeneration;

namespace UserService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenGenerator _tokenGenerator;

        public BooksController(IUserService _userService, ITokenGenerator _tokenGenerator)
        {
            this._userService = _userService;
            this._tokenGenerator = _tokenGenerator;
            
        }
        [HttpPost]
        [Route("Register")]
        public IActionResult RegisterUser(BookUser user)
        {
            try
            {
                //MemoryStream memory = new MemoryStream();
                //Img.CopyTo(memory);
                //user.UserImage = memory.ToArray();
                //User user = new User();
                _userService.Register(user);
                return Ok("User Registered Successfully");
            }
            catch (UserAlreadyExistsException ex)
            {
                return Conflict(ex.Message);
            }
        }
        [HttpPost]
        [Route("Login")]
        public IActionResult Login( Login login)
        {
            var res = _userService.Login(login.email, login.password);
            if (res != null)
            {
                return Ok(_tokenGenerator.GenerateToken(res.email, res.MobileNo.ToString()));
            }
            else
            {
                return StatusCode(401, "Invalid Credentials");
            }
        }
      
        [HttpPut]
        [Route("UpdateMobileNumber/{email}")]
        public IActionResult UpdateMobile(string email, string mobileno)
        {
            try
            {
                _userService.UpdateMobileNo(email, mobileno);
                return Ok("Mobile Number Updated");
            }
            catch (UserNotFoundException ex)
            {
                return Conflict(ex.Message);
            }
        }
        [HttpPut]
        [Route("UpdatePassword")]
        public IActionResult UpdatePassword([FromBody] Login login)
        {
            try
            {
                _userService.UpdatePassword(login.email, login.password);
                return Ok("Password Changed Successfully");
            }
            catch (UserNotFoundException ex)
            {
                return Conflict(ex.Message);
            }
        }
        [HttpPut]
        [Route("UpdateUserName/{email}")]
        public IActionResult UpdateUserName(string email, string name)
        {
            try
            {
                _userService.UpdateName(email, name);
                return Ok("Username Changed Successfully");
            }
            catch (UserNotFoundException ex)
            {
                return Conflict(ex.Message);
            }
        }
       
       

        [HttpGet]
        [Route("GetUserByEmail/{email}")]
        public IActionResult GetUserById(string email)
        {
            try
            {
                var res = _userService.GetUserByEmail(email);
                return Ok(res);
            }
            catch (UserNotFoundException ex)
            {
                return Conflict(ex.Message);
            }
        }
    }
}

