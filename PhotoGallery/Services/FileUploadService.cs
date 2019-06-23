using Microsoft.AspNetCore.Http;
using System;
using System.IO;

namespace PhotoGallery.Services
{
    public class FileUploadService : IFileUploadService
    {
        public string Upload(IFormFile file, string folderPath)
        {
            var originExtenstion = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{originExtenstion}";
            var filePath = Path.Combine(folderPath, fileName);

            if (file.Length > 0)
            {
                Directory.CreateDirectory(folderPath);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
            }

            return fileName;
        }
    }
}
