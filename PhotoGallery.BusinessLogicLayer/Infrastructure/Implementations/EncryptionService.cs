using PhotoGallery.BusinessLogicLayer.Infrastructure.Interfaces;
using System;
using System.Security.Cryptography;
using System.Text;

namespace PhotoGallery.BusinessLogicLayer.Infrastructure.Implementations
{
    public class EncryptionService : IEncryptionService
    {
        public string Encrypt(string password)
        {
            var data = Encoding.UTF8.GetBytes(password);
            byte[] hash;

            using(var sha512 = SHA512.Create())
            {
                hash = sha512.ComputeHash(data);
            }

            return Convert.ToBase64String(hash);
        }
    }
}
