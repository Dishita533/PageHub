using Moq;
using Microsoft.AspNetCore.Mvc;
using UserService.Controllers;
using UserService.SeviceLayer;
using UserService.SeviceLayer.TokenGeneration;
using UserService.Models;
using UserService.Exceptions;
using System;

namespace UserServiceTest
{
    public class UserTest
    {
        private Mock<IUserService> _userServiceMock;
        private Mock<ITokenGenerator> _tokenGeneratorMock;
        private BooksController _controller;

        [SetUp]
        public void Setup()
        {
            _userServiceMock = new Mock<IUserService>();
            _tokenGeneratorMock = new Mock<ITokenGenerator>();
            _controller = new BooksController(_userServiceMock.Object, _tokenGeneratorMock.Object);
        }

        [Test]
        public void RegisterUser_ValidUser_ReturnsOk()
        {
            // Arrange
            var user = new BookUser { email = "test@example.com", Password = "test123" };
            _userServiceMock.Setup(x => x.Register(It.IsAny<BookUser>())).Verifiable();

            // Act
            var result = _controller.RegisterUser(user);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual("User Registered Successfully", okResult.Value);
        }

        [Test]
        public void RegisterUser_UserAlreadyExists_ThrowsConflict()
        {
            // Arrange
            var user = new BookUser { email = "test@example.com", Password = "test123" };
            _userServiceMock.Setup(x => x.Register(It.IsAny<BookUser>()))
                .Throws(new UserAlreadyExistsException("User already exists"));

            // Act
            var result = _controller.RegisterUser(user);

            // Assert
            Assert.IsInstanceOf<ConflictObjectResult>(result);
            var conflictResult = result as ConflictObjectResult;
            Assert.AreEqual("User already exists", conflictResult.Value);
        }

        [Test]
        public void Login_ValidCredentials_ReturnsOkWithToken()
        {
            // Arrange
            var login = new Login { email = "test@example.com", password = "test123" };
            var user = new BookUser { email = "test@example.com", MobileNo = "1234567890" };

            _userServiceMock.Setup(x => x.Login(login.email, login.password)).Returns(user);
            _tokenGeneratorMock.Setup(x => x.GenerateToken(user.email, user.MobileNo)).Returns("dummy_token");

            // Act
            var result = _controller.Login(login);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual("dummy_token", okResult.Value);
        }

        [Test]
        public void Login_InvalidCredentials_ReturnsUnauthorized()
        {
            // Arrange
            var login = new Login { email = "test@example.com", password = "wrongpassword" };
            _userServiceMock.Setup(x => x.Login(login.email, login.password)).Returns((BookUser)null);

            // Act
            var result = _controller.Login(login);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var unauthorizedResult = result as ObjectResult;
            Assert.AreEqual(401, unauthorizedResult.StatusCode);
            Assert.AreEqual("Invalid Credentials", unauthorizedResult.Value);
        }

        [Test]
        public void UpdateMobile_ValidEmail_ReturnsOk()
        {
            // Arrange
            string email = "test@example.com";
            string mobileno = "1234567890";
            _userServiceMock.Setup(x => x.UpdateMobileNo(email, mobileno)).Verifiable();

            // Act
            var result = _controller.UpdateMobile(email, mobileno);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual("Mobile Number Updated", okResult.Value);
        }

        [Test]
        public void UpdateMobile_UserNotFound_ThrowsConflict()
        {
            // Arrange
            string email = "unknown@example.com";
            string mobileno = "1234567890";
            _userServiceMock.Setup(x => x.UpdateMobileNo(email, mobileno))
                .Throws(new UserNotFoundException("User not found"));

            // Act
            var result = _controller.UpdateMobile(email, mobileno);

            // Assert
            Assert.IsInstanceOf<ConflictObjectResult>(result);
            var conflictResult = result as ConflictObjectResult;
            Assert.AreEqual("User not found", conflictResult.Value);
        }

        [Test]
        public void GetUserById_ValidEmail_ReturnsOkWithUser()
        {
            // Arrange
            string email = "test@example.com";
            var user = new BookUser { email = email };

            _userServiceMock.Setup(x => x.GetUserByEmail(email)).Returns(user);

            // Act
            var result = _controller.GetUserById(email);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(user, okResult.Value);
        }

        [Test]
        public void GetUserById_UserNotFound_ThrowsConflict()
        {
            // Arrange
            string email = "unknown@example.com";
            _userServiceMock.Setup(x => x.GetUserByEmail(email))
                .Throws(new UserNotFoundException("User not found"));

            // Act
            var result = _controller.GetUserById(email);
            // Assert
            Assert.IsInstanceOf<ConflictObjectResult>(result);
            var conflictResult = result as ConflictObjectResult;
            Assert.AreEqual("User not found", conflictResult.Value);
        }
    }
}
    