using PhotoGallery.DataAccessLayer.Entities;
using System;

namespace PhotoGallery.DataAccessLayer.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<User, int> UserRepository { get; }

        IRepository<Album, int> AlbumRepository { get; }

        void Commit();

        void Rollback();
    }
}
