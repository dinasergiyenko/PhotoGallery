using Microsoft.AspNetCore.Http;

namespace PhotoGallery.Services
{
    public interface IFileUploadService
    {
        string Upload(IFormFile file, string folderPath);
    }
}
