using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Ocelot.Provider.Consul;


namespace APIGatewayService
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);
            builder.Configuration.AddJsonFile("ocelot.json");
            /* builder.Services.AddOcelot();*/
            builder.Services.AddOcelot().AddConsul();
            /*var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("Jwt").GetSection("Secret").Value));
            builder.Services.AddAuthentication(op =>
            {
                op.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                op.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer("token", op => op.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidIssuer = builder.Configuration.GetSection("Jwt").GetSection("Issuer").Value,
                ValidateAudience = true,
                ValidAudience = builder.Configuration.GetSection("Jwt").GetSection("Audience").Value,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key
            });*/
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer("JwtBearer", options =>
                {
                    var key = Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]);
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["JWT:Issuer"],
                        ValidAudience = builder.Configuration["JWT:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(key)
                    };
                });

            /*builder.Services.AddCors(options =>
            {
                options.AddPolicy("Gateway", policy =>
                {
                    policy.AllowAnyOrigin().AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });*/
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngularDev",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200") // Replace with your Angular app's URL
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });
            builder.Services.AddAuthorization();

            var app = builder.Build();

            app.UseCors("AllowAngularDev");
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapGet("/", () => "Hello World!"); 
            app.UseOcelot().Wait();
            app.UseStaticFiles();
            /*app.UseCors("AllowAngularDev");*/
            app.Run();
        }
    }
}
