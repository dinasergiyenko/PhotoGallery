using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhotoGallery.BusinessLogicLayer.Interfaces;
using PhotoGallery.Models;

namespace PhotoGallery.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly IUserService _userService;

        public AuthenticationController(
            IUserService userService
            )
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public UserViewModel Login([FromBody]UserViewModel user)
        {
            var token = _userService.Login(user.Username, user.Password);
            var loggedUser = _userService.GetByLogin(user.Username);

            return new UserViewModel()
            {
                Username = loggedUser.Login,
                Token = token
            };
        }
    }
}
