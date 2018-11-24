using PhotoGallery.DataAccessLayer.Entities;

namespace PhotoGallery.BusinessLogicLayer.Interfaces
{
    public interface IUserService
    {
        bool IsUserExist(string login);
        bool AreCredentialsValid(string login, string password);
        User GetById(int id);
        User GetByLogin(string login);
        void Login(string login, string password);
        void Register(User user);
        void Update(User user);
    }
}
