using PhotoGallery.DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace PhotoGallery.BusinessLogicLayer.Interfaces
{
    public interface IPhotoService
    {
        bool IsPhotoExist(int photoId);
        Photo GetById(int photoId);
        IEnumerable<Photo> GetByAlbumId(int albumId);
        IEnumerable<Photo> GetByUserId(int userId);
        IEnumerable<Photo> GetPhotos(int pageNumber, int pageSize);
        void Add(Photo photo);
        void Update(Photo photo);
        void Remove(int photoId);
    }
}
