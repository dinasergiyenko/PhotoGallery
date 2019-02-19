using PhotoGallery.DataAccessLayer.Entities;

namespace PhotoGallery.BusinessLogicLayer.Interfaces
{
    public interface IUserService
    {

        bool IsUserExist(int userId);
        User GetById(int id);

        void Update(User user);
    }
}
