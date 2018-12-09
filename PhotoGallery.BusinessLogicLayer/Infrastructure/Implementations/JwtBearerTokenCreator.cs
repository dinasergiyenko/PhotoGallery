using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PhotoGallery.BusinessLogicLayer.Infrastructure.Interfaces;
using PhotoGallery.Common.Settings;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PhotoGallery.BusinessLogicLayer.Infrastructure.Implementations
{
    public class JwtBearerTokenCreator : ITokenCreator
    {
        private readonly AppSettings _appSettings;

        public JwtBearerTokenCreator(
            IOptions<AppSettings> appSettings
            )
        {
            _appSettings = appSettings.Value;
        }

        public string Generate(string userIdentifier)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_appSettings.JwtBearerKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.UtcNow.AddDays(_appSettings.JwtBearerLifeTime),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature),
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, userIdentifier, ClaimValueTypes.Integer32),
                    //new Clai
                })
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
