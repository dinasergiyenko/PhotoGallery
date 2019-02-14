using PhotoGallery.DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace PhotoGallery.BusinessLogicLayer.Interfaces
{
    public interface IAlbumService
    {
        bool IsAlbumExist(int ablumbId);
        IEnumerable<Album> GetByUser(int userId, int pageNumber, int pageSize);
        Album GetById(int albumId);
        void Add(Album album);
        void Update(Album album);
        void Remove(Album album);
    }
}
