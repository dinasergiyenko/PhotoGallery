using PhotoGallery.DataAccessLayer.Entities;

namespace PhotoGallery.BusinessLogicLayer.Interfaces
{
    public interface IUserService
    {
        bool IsUserLoginExist(string login);
        bool IsUserExist(int userId);
        bool AreCredentialsValid(string login, string password);
        User GetById(int id);
        User GetByLogin(string login);
        string Login(string login, string password);
        void Register(User user);
        void Update(User user);
    }
}
