using PhotoGallery.DataAccessLayer.Entities;
using PhotoGallery.DataAccessLayer.Interfaces;
using PhotoGallery.DataAccessLayer.Repositories;
using System.Linq;

namespace PhotoGallery.DataAccessLayer
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DatabaseContext _databaseContext;

        public UnitOfWork(
            DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public IRepository<User, int> UserRepository => _userRepository ?? (_userRepository = new UserRepository(_databaseContext));

        private IRepository<User, int> _userRepository;

        public IRepository<Album, int> AlbumRepository => _albumRepository ?? (_albumRepository = new AlbumRepository(_databaseContext));

        private IRepository<Album, int> _albumRepository;

        public IRepository<Photo, int> PhotoRepository => _photoRepository ?? (_photoRepository = new PhotoRepository(_databaseContext));

        private IRepository<Photo, int> _photoRepository;

        public IRepository<Comment, int> CommentRepository => _commentRepository ?? (_commentRepository = new CommentRepository(_databaseContext));

        private IRepository<Comment, int> _commentRepository;

        public void Commit()
        {
            _databaseContext.SaveChanges();
        }

        public void Rollback()
        {
            _databaseContext
                .ChangeTracker
                .Entries()
                .ToList()
                .ForEach(x => x.Reload());
        }

        public void Dispose()
        {
            _databaseContext?.Dispose();
        }
    }
}
