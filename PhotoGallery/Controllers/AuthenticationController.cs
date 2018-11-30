using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhotoGallery.BusinessLogicLayer.Interfaces;
using PhotoGallery.DataAccessLayer.Entities;
using PhotoGallery.Models;

namespace PhotoGallery.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
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

        [AllowAnonymous]
        public IActionResult Register([FromBody]RegistrationViewModel user)
        {
            if (!this.ModelState.IsValid)
            {
                return BadRequest("User's properties are not valid.");
            }

            _userService.Register(new User
            {
                Login = user.Username,
                Password = user.Password,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                City = user.City,
                FieldOfActivity = user.FieldOfActivity
            });

            return Ok();
        }
    }
}
