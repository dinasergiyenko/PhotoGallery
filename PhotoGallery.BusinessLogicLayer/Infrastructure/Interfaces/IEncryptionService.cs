using System;
using System.Collections.Generic;
using System.Text;

namespace PhotoGallery.BusinessLogicLayer.Infrastructure.Interfaces
{
    public interface IEncryptionService
    {
        string Encrypt(string password);
    }
}
