using PhotoGallery.DataAccessLayer.Entities;
using System.Collections.Generic;

namespace PhotoGallery.BusinessLogicLayer.Interfaces
{
    public interface IPhotoService
    {
        bool IsPhotoExist(int photoId);
        Photo GetById(int photoId);
        IEnumerable<Photo> GetByAlbumId(int albumId, int pageNumber, int pageSize);
        IEnumerable<Photo> GetPhotos(int pageNumber, int pageSize);
        void Add(Photo photo);
        void Update(Photo photo);
        void Remove(int photoId);
    }
}
