
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using UserService.RepistoryLayer;
using UserService.SeviceLayer;
using UserService.SeviceLayer.TokenGeneration;
using UserService.UserDbContext;

namespace UserService
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
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IUserService,UsersService>();
            builder.Services.AddScoped<ITokenGenerator, TokenGenerator>();
            builder.Services.AddCors(op => op.AddPolicy("Policy", plcy => plcy.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod()));



            builder.Services.AddDbContext<UsersDbContext>(options =>
            {
                var conStr = builder.Configuration.GetConnectionString("conStr");
                options.UseSqlServer(conStr);
            });
            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());

                options.JsonSerializerOptions.DefaultIgnoreCondition =
                    JsonIgnoreCondition.WhenWritingNull;
            });
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngularDev",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200") // Replace with your Angular app's URL
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowAnyOrigin()
                            .Build();
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
            app.UseCors("Policy");

            app.MapControllers();
            app.UseCors("AllowAngularDev");
            app.Run();
        }
    }
}
