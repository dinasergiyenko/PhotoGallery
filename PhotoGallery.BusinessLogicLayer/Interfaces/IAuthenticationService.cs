using PhotoGallery.DataAccessLayer.Entities;

namespace PhotoGallery.BusinessLogicLayer.Interfaces
{
    public interface IAuthenticationService
    {
        bool IsUserLoginExist(string login);
        bool AreCredentialsValid(string login, string password);
        User GetByLogin(string login);
        string Login(string login, string password);
        void Register(User user);
    }
}