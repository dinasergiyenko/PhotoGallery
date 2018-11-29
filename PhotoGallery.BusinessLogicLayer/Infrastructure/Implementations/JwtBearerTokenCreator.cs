using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PhotoGallery.BusinessLogicLayer.Infrastructure.Interfaces;
using PhotoGallery.Common.Settings;
using System;
using System.IdentityModel.Tokens.Jwt;
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

        public string Generate()
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_appSettings.JwtBearerKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.UtcNow.AddDays(_appSettings.JwtBearerLifeTime),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
