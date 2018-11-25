using PhotoGallery.BusinessLogicLayer.Infrastructure.Exceptions;
using PhotoGallery.BusinessLogicLayer.Infrastructure.Interfaces;
using PhotoGallery.BusinessLogicLayer.Interfaces;
using PhotoGallery.DataAccessLayer.Entities;
using PhotoGallery.DataAccessLayer.Interfaces;
using System.Linq;

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

        public bool AreCredentialsValid(string login, string password)
        {
            var encryptedPassword = _encryptionService.Encrypt(password);

            return _unitOfWork.UserRepository
                .Find(x => x.Login == login && x.Password == encryptedPassword)
                .Any();
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

        public User GetByLogin(string login)
        {
            var user = _unitOfWork.UserRepository
                .Find(x => x.Login == login)
                .FirstOrDefault();

            if (user == null)
            {
                throw new CustomValidationException("There is no such user.");
            }

            return user;
        }

        public void Login(string login, string password)
        {
            if (!IsUserLoginExist(login))
            {
                throw new CustomValidationException("There is no such user.");
            }

            if (!AreCredentialsValid(login, password))
            {
                throw new CustomValidationException("Credentials are not valid.");
            }
        }

        public void Register(User user)
        {
            if (IsUserLoginExist(user.Login))
            {
                throw new CustomValidationException("User already exists.");
            }

            user.Password = _encryptionService.Encrypt(user.Password);

            _unitOfWork.UserRepository.Add(user);
            _unitOfWork.Commit();
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

        public bool IsUserLoginExist(string login)
        {
            return _unitOfWork.UserRepository
                .Find(x => x.Login == login)
                .Any();
        }

        public bool IsUserExist(int userId)
        {
            return _unitOfWork.UserRepository.Get(userId) != null;
        }
    }
}
