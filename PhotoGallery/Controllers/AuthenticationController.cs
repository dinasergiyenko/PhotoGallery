using AutoMapper;
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
        private readonly IMapper _mapper;

        public AuthenticationController(
            IUserService userService,
            IMapper mapper
            )
        {
            _userService = userService;
            _mapper = mapper;
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

            var model = _mapper.Map<UserViewModel>(loggedUser);
            model.Token = token;

            return Ok(model);
        }

        [AllowAnonymous]
        public IActionResult Register([FromBody]RegistrationViewModel viewModel)
        {
            if (!this.ModelState.IsValid)
            {
                return BadRequest("User's properties are not valid.");
            }

            _userService.Register(_mapper.Map<User>(viewModel));

            return Ok();
        }
    }
}
