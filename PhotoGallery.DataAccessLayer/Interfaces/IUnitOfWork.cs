using PhotoGallery.DataAccessLayer.Entities;
using System;

namespace PhotoGallery.DataAccessLayer.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<User, int> UserRepository { get; }

        void Commit();

        void Rollback();
    }
}
