using PhotoGallery.BusinessLogicLayer.Infrastructure.Exceptions;
using PhotoGallery.BusinessLogicLayer.Interfaces;
using PhotoGallery.DataAccessLayer.Entities;
using PhotoGallery.DataAccessLayer.Interfaces;
using System.Collections.Generic;

namespace PhotoGallery.BusinessLogicLayer.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAlbumService _albumService;

        public PhotoService(
            IUnitOfWork unitOfWork,
            IAlbumService albumService
            )
        {
            _unitOfWork = unitOfWork;
            _albumService = albumService;
        }

        public void Add(Photo photo)
        {
            if (!_albumService.IsAlbumExist(photo.AlbumId))
            {
                throw new CustomValidationException("There is no album to add photo.");
            }

            _unitOfWork.PhotoRepository.Add(photo);
            _unitOfWork.Commit();
        }

        public IEnumerable<Photo> GetByAlbumId(int albumId)
        {
            return _unitOfWork.PhotoRepository.Find(x => x.AlbumId == albumId);
        }

        public IEnumerable<Photo> GetByUserId(int userId)
        {
            return _unitOfWork.PhotoRepository.Find(x => x.Album.UserId == userId);
        }

        public IEnumerable<Photo> GetPhotos(int pageNumber, int pageSize)
        {
            return _unitOfWork.PhotoRepository.Find(x => true, pageNumber, pageSize);
        }

        public Photo GetById(int photoId)
        {
            var photo = _unitOfWork.PhotoRepository.Get(photoId);

            if (photo == null)
            {
                throw new CustomValidationException("There is no such photo.");
            }

            return photo;
        }

        public bool IsPhotoExist(int photoId)
        {
            return _unitOfWork.PhotoRepository.Get(photoId) != null;
        }

        public void Remove(int photoId)
        {
            var photo = _unitOfWork.PhotoRepository.Get(photoId);

            if (photo == null)
            {
                throw new CustomValidationException("This photo has been already removed.");
            }

            _unitOfWork.PhotoRepository.Remove(photo);
            _unitOfWork.Commit();
        }

        public void Update(Photo newPhoto)
        {
            var oldPhoto = _unitOfWork.PhotoRepository.Get(newPhoto.Id);

            if (oldPhoto == null)
            {
                throw new CustomValidationException("There is no photo to update.");
            }

            oldPhoto.Title = newPhoto.Title;
            oldPhoto.Description = newPhoto.Description;
            oldPhoto.AlbumId = newPhoto.AlbumId;

            _unitOfWork.Commit();
        }
    }
}
