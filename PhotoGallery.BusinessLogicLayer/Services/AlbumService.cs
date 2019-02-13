using PhotoGallery.BusinessLogicLayer.Infrastructure.Exceptions;
using PhotoGallery.BusinessLogicLayer.Interfaces;
using PhotoGallery.DataAccessLayer.Entities;
using PhotoGallery.DataAccessLayer.Interfaces;
using System.Collections.Generic;

namespace PhotoGallery.BusinessLogicLayer.Services
{
    public class AlbumService : IAlbumService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserService _userService;

        public AlbumService(
            IUnitOfWork unitOfWork,
            IUserService userService
            )
        {
            _unitOfWork = unitOfWork;
            _userService = userService;
        }

        public void Add(Album album)
        {
            if (!_userService.IsUserExist(album.UserId))
            {
                throw new CustomValidationException("There is no such user.");
            }

            _unitOfWork.AlbumRepository.Add(album);
            _unitOfWork.Commit();
        }

        public IEnumerable<Album> GetByUser(int userId, int pageNumber, int pageSize)
        {
            if (!_userService.IsUserExist(userId))
            {
                throw new CustomValidationException("There is no such user.");
            }

            return _unitOfWork.AlbumRepository
                .Find(x => x.UserId == userId, pageNumber, pageSize);
        }

        public Album GetById(int albumbId)
        {
            var album = _unitOfWork.AlbumRepository.Get(albumbId);

            if (album == null)
            {
                throw new CustomValidationException("There is no such album.");
            }

            return album;
        }

        public bool IsAlbumExist(int albumId)
        {
            return _unitOfWork.AlbumRepository.Get(albumId) != null;
        }

        public void Remove(int albumId)
        {
            var album = GetById(albumId);

            _unitOfWork.AlbumRepository.Remove(album);
            _unitOfWork.Commit();
        }

        public void Update(Album newAlbum)
        {
            var oldAlbum = GetById(newAlbum.Id);

            if (oldAlbum.UserId != newAlbum.UserId)
            {
                throw new CustomValidationException("The logged user cannot update this album.");
            }

            oldAlbum.Title = newAlbum.Title;
            oldAlbum.Description = newAlbum.Description;

            _unitOfWork.Commit();
        }
    }
}
