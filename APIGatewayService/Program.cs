using Ocelot.DependencyInjection;
using Ocelot.Middleware;

namespace APIGatewayService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Configuration.AddJsonFile("ocelot.json");
            builder.Services.AddOcelot();
            var app = builder.Build();


            app.MapGet("/", () => "Hello World!"); 
            app.UseOcelot().Wait();
            app.Run();
        }
    }
}
