using PhotoGallery.BusinessLogicLayer.Infrastructure.Exceptions;
using PhotoGallery.BusinessLogicLayer.Infrastructure.Interfaces;
using PhotoGallery.BusinessLogicLayer.Interfaces;
using PhotoGallery.DataAccessLayer.Entities;
using PhotoGallery.DataAccessLayer.Interfaces;

namespace PhotoGallery.BusinessLogicLayer.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEncryptionService _encryptionService;

        public UserService(
            IUnitOfWork unitOfWork,
            IEncryptionService encryptionService
            )
        {
            _unitOfWork = unitOfWork;
            _encryptionService = encryptionService;
        }

        public User GetById(int id)
        {
            var user = _unitOfWork.UserRepository.Get(id);

            if (user == null)
            {
                throw new CustomValidationException("There is no such user.");
            }

            return user;
        }

        public void Update(User newUser)
        {
            var oldUser = GetById(newUser.Id);

            oldUser.FirstName = newUser.FirstName;
            oldUser.LastName = newUser.LastName;
            oldUser.City = newUser.City;
            oldUser.Email = newUser.Email;
            oldUser.FieldOfActivity = newUser.FieldOfActivity;
            oldUser.Password = _encryptionService.Encrypt(newUser.Password);

            _unitOfWork.Commit();
        }

        public bool IsUserExist(int userId)
        {
            return _unitOfWork.UserRepository.Get(userId) != null;
        }
    }
}
