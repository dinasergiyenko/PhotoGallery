using Microsoft.AspNetCore.Mvc;

namespace PhotoGallery.Controllers
{
    public class BaseController : Controller
    {
        public bool IsCurrentUser(int modelUserId)
        {
            var userId = GetCurrentUserId();

            return userId == modelUserId;
        }

        public int GetCurrentUserId()
        {
            return int.Parse(User.Identity.Name);
        }
    }
}
