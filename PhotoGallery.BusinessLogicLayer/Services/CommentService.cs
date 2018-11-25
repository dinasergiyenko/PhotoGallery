using PhotoGallery.BusinessLogicLayer.Infrastructure.Exceptions;
using PhotoGallery.BusinessLogicLayer.Interfaces;
using PhotoGallery.DataAccessLayer.Entities;
using PhotoGallery.DataAccessLayer.Interfaces;
using System.Collections.Generic;

namespace PhotoGallery.BusinessLogicLayer.Services
{
    public class CommentService : ICommentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserService _userService;
        private readonly IPhotoService _photoService;

        public CommentService(
            IUnitOfWork unitOfWork,
            IUserService userService,
            IPhotoService photoService
            )
        {
            _unitOfWork = unitOfWork;
            _userService = userService;
            _photoService = photoService;
        }

        public void Add(Comment comment)
        {
            if (!_userService.IsUserExist(comment.UserId))
            {
                throw new CustomValidationException("There is no user to add comment.");
            }

            if (!_photoService.IsPhotoExist(comment.PhotoId))
            {
                throw new CustomValidationException("There is no photo to add comment.");
            }

            _unitOfWork.CommentRepository.Add(comment);
            _unitOfWork.Commit();
        }

        public IEnumerable<Comment> GetByPhotoId(int photoId)
        {
            if (!_photoService.IsPhotoExist(photoId))
            {
                throw new CustomValidationException("There is no such photo.");
            }

            return _unitOfWork.CommentRepository.Find(x => x.PhotoId == photoId);
        }
    }
}
