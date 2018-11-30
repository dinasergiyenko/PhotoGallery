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
        public IActionResult Login([FromBody]LoginViewModel viewModel)
        {
            if (!this.ModelState.IsValid)
            {
                return BadRequest("Login's properties are not valid.");
            }

            var token = _userService.Login(viewModel.Username, viewModel.Password);
            var loggedUser = _userService.GetByLogin(viewModel.Username);

            return Ok(new UserViewModel()
            {
                Username = loggedUser.Login,
                FirstName = loggedUser.FirstName,
                LastName = loggedUser.LastName,
                Email = loggedUser.Email,
                City = loggedUser.City,
                FieldOfActivity = loggedUser.FieldOfActivity,
                Token = token
            });
        }

        [AllowAnonymous]
        public IActionResult Register([FromBody]RegistrationViewModel viewModel)
        {
            if (!this.ModelState.IsValid)
            {
                return BadRequest("User's properties are not valid.");
            }

            _userService.Register(new User
            {
                Login = viewModel.Username,
                Password = viewModel.Password,
                FirstName = viewModel.FirstName,
                LastName = viewModel.LastName,
                Email = viewModel.Email,
                City = viewModel.City,
                FieldOfActivity = viewModel.FieldOfActivity
            });

            return Ok();
        }
    }
}
