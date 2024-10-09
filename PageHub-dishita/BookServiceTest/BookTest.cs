using BookService.Models;
using BookService.Controllers;
using BookService.Business;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
namespace BookServiceTest
{
    public class BookTest
    {
        private Mock<IBookBusiness> _mockBookBusiness;
        private BookController _bookController;

        [SetUp]
        public void Setup()
        {
            // Arrange
            _mockBookBusiness = new Mock<IBookBusiness>();
            _bookController = new BookController(_mockBookBusiness.Object);
        }

        [Test]
        public void GetAllBooks_WhenBooksExist_ReturnsOkResult()
        {
            // Arrange
            var books = new List<Book>
            {
                new Book { Id = 1, Genre = "Science Fiction", Title = "Book 1" },
                new Book { Id = 2, Genre = "Fantasy", Title = "Book 2" }
            };

            _mockBookBusiness.Setup(b => b.GetBooks()).Returns(books);

            // Act
            var result = _bookController.GetAllBooks();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(books, okResult.Value);
        }

        [Test]
        public void GetAllBooks_WhenNoBooksExist_ReturnsNotFoundResult()
        {
            // Arrange
            _mockBookBusiness.Setup(b => b.GetBooks()).Returns(new List<Book>());

            // Act
            var result = _bookController.GetAllBooks();

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

        [Test]
        public void GetBookByGenre_WhenBookExists_ReturnsOkResult()
        {
            // Arrange
            var book = new Book { Id = 1, Genre = "Fantasy", Title = "Book 1" };
            _mockBookBusiness.Setup(b => b.GetBook(It.IsAny<string>())).Returns(book);

            // Act
            var result = _bookController.GetBookbyGenre("Fantasy");

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(book, okResult.Value);
        }

        [Test]
        public void GetBookByGenre_WhenBookDoesNotExist_ReturnsNotFoundResult()
        {
            // Arrange
            _mockBookBusiness.Setup(b => b.GetBook(It.IsAny<string>())).Returns((Book)null);

            // Act
            var result = _bookController.GetBookbyGenre("Fantasy");

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

        [Test]
        public void AddBook_WhenBookIsValid_ReturnsCreatedAtActionResult()
        {
            // Arrange
            var book = new Book { Id = 1, Genre = "Fantasy", Title = "New Book" };
            _mockBookBusiness.Setup(b => b.AddBook(book));

            // Act
            var result = _bookController.AddBooks(book);

            // Assert
            Assert.IsInstanceOf<CreatedAtActionResult>(result);
        }

        [Test]
        public void GetBookById_WhenBookExists_ReturnsOkResult()
        {
            // Arrange
            var book = new Book { Id = 1, Genre = "Science Fiction", Title = "Book 1" };
            _mockBookBusiness.Setup(b => b.GetBookById(It.IsAny<int>())).Returns(book);

            // Act
            var result = _bookController.GetBookById(1);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(book, okResult.Value);
        }

       
    }
}