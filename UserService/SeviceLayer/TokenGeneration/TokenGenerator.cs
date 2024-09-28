using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace UserService.SeviceLayer.TokenGeneration
{
    public class TokenGenerator : ITokenGenerator
    {
        public string GenerateToken(string email, string mobileno)
        {
            var claims = new[] { new Claim(ClaimTypes.Email, email), new Claim(ClaimTypes.MobilePhone, mobileno) };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("This_is_my_very_secure_256bit_key!"));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: "UserServiceAPI",
                audience: "BookServiceAPI",
                claims: claims,
                expires: DateTime.Now.AddMinutes(10),
                signingCredentials: credentials

                );
            var respone = new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
            };
            return JsonConvert.SerializeObject(respone);
        }
    }
}
