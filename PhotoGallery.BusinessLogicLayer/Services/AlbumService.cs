﻿using PhotoGallery.BusinessLogicLayer.Infrastructure.Exceptions;
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

        public IEnumerable<Album> GetByUser(int userId)
        {
            if (!_userService.IsUserExist(userId))
            {
                throw new CustomValidationException("There is no such user.");
            }

            return _unitOfWork.AlbumRepository.Find(x => x.UserId == userId);
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
            var album = _unitOfWork.AlbumRepository.Get(albumId);

            if (album == null)
            {
                throw new CustomValidationException("This album has been already removed.");
            }

            _unitOfWork.AlbumRepository.Remove(album);
            _unitOfWork.Commit();
        }

        public void Update(Album newAlbum)
        {
            var oldAlbum = _unitOfWork.AlbumRepository.Get(newAlbum.Id);

            if (oldAlbum == null)
            {
                throw new CustomValidationException("There is no album to update.");
            }

            oldAlbum.Title = newAlbum.Title;
            oldAlbum.Descirption = newAlbum.Descirption;

            _unitOfWork.Commit();
        }
    }
}