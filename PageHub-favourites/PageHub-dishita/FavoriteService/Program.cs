
using FavoriteService.Business;
using FavoriteService.Models;

namespace FavoriteService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDbSettings"));


            // CORS configuration
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAnyOrigin",
                    builder => builder.AllowAnyOrigin() // Change this to your Angular app URL
                                      .AllowAnyHeader()
                                      .AllowAnyMethod());
            });

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddSingleton<FavoriteDbContext>();

            // Register IMusicService to be used by controllers
            builder.Services.AddScoped<IFavoriteBusiness, FavoriteBusiness>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowAnyOrigin");
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
