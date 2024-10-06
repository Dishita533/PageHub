
using BookService.Business;
using BookService.Data_Access;
using BookService.Repository;
using Microsoft.EntityFrameworkCore;
using WishListService.Models;
using WishListService.Repository_Layer;
using WishListService.Service_Layer;

namespace WishListService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<FavDbContext>(options =>
            {
                var conStr = builder.Configuration.GetConnectionString("conStr1");
                options.UseSqlServer(conStr);
            });
            builder.Services.AddScoped<IRepository, Repository>();
            builder.Services.AddScoped<IService, Service>();
            //builder.Services.AddScoped<IBookDataAccess, BookDataAccess>();
            //builder.Services.AddScoped<IBookBusiness, BookBusiness>();
            //builder.Services.AddScoped<IBookRepository, BookRepository>();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("Favorites", policy =>
                {
                    policy.WithOrigins("http://localhost:4200")
                          .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();
            app.UseStaticFiles();
            app.UseCors("Favorites");
            app.MapControllers();

            app.Run();
        }
    }
}
