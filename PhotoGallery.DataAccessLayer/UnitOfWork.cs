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

        public IRepository<User, int> UserRepository
        {
            get
            {
                if (_userRepository == null)
                {
                    _userRepository = new UserRepository(_databaseContext);
                }

                return _userRepository;
            }
        }

        private IRepository<User, int> _userRepository;

        public IRepository<Album, int> AlbumRepository
        {
            get
            {
                if (_albumRepository == null)
                {
                    _albumRepository = new AlbumRepository(_databaseContext);
                }

                return _albumRepository;
            }
        }

        private IRepository<Album, int> _albumRepository;

        public IRepository<Photo, int> PhotoRepository
        {
            get
            {
                if (_photoRepository == null)
                {
                    _photoRepository = new PhotoRepository(_databaseContext);
                }

                return _photoRepository;
            }
        }

        private IRepository<Photo, int> _photoRepository;

        public IRepository<Comment, int> CommentRepository
        {
            get
            {
                if (_commentRepository == null)
                {
                    _commentRepository = new GenericRepository<Comment, int>(_databaseContext);
                }

                return _commentRepository;
            }
        }

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
            if (_databaseContext != null)
            {
                _databaseContext.Dispose();
            }
        }
    }
}
