using BookService.Business;
using BookService.Repository;
using BookService.Data_Access;

using BookService.Models;

using Microsoft.EntityFrameworkCore;

namespace BookService
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
            builder.Services.AddDbContext<BookDbcontext>(options =>
            {
                var conStr = builder.Configuration.GetConnectionString("conStr");
                options.UseSqlServer(conStr);
            });
            builder.Services.AddScoped<IBookDataAccess, BookDataAccess>();
            builder.Services.AddScoped<IBookRepository, BookRepository>();
            builder.Services.AddScoped<IBookBusiness, BookBusiness>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("Books", policy =>
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
            app.UseCors("Books");
            app.MapControllers();

            app.Run();
        }
    }
}
