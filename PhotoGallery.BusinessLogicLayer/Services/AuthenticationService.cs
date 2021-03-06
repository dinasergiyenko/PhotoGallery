﻿using System.Linq;
using PhotoGallery.BusinessLogicLayer.Infrastructure.Exceptions;
using PhotoGallery.BusinessLogicLayer.Infrastructure.Interfaces;
using PhotoGallery.BusinessLogicLayer.Interfaces;
using PhotoGallery.DataAccessLayer.Entities;
using PhotoGallery.DataAccessLayer.Interfaces;

namespace PhotoGallery.BusinessLogicLayer.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEncryptionService _encryptionService;
        private readonly ITokenCreator _tokenCreator;

        public AuthenticationService(
            IUnitOfWork unitOfWork,
            IEncryptionService encryptionService,
            ITokenCreator tokenCreator
        )
        {
            _unitOfWork = unitOfWork;
            _encryptionService = encryptionService;
            _tokenCreator = tokenCreator;
        }

        public bool IsUserLoginExist(string login)
        {
            return _unitOfWork.UserRepository
                .Find(x => x.Login == login)
                .Any();
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

        public string Login(string login, string password)
        {
            if (!AreCredentialsValid(login, password))
            {
                throw new CustomValidationException("Credentials are not valid.");
            }

            var user = GetByLogin(login);

            return _tokenCreator.Generate(user.Id.ToString());
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

        public bool AreCredentialsValid(string login, string password)
        {
            var encryptedPassword = _encryptionService.Encrypt(password);

            return _unitOfWork.UserRepository
                .Find(x => x.Login == login && x.Password == encryptedPassword)
                .Any();
        }
    }
}