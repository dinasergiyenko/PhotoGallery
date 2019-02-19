using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PhotoGallery.BusinessLogicLayer.Interfaces;
using PhotoGallery.DataAccessLayer.Entities;
using PhotoGallery.Models;

namespace PhotoGallery.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AuthenticationController : Controller
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IMapper _mapper;

        public AuthenticationController(
            IAuthenticationService authenticationService,
            IMapper mapper
            )
        {
            _authenticationService = authenticationService;
            _mapper = mapper;
        }

        public IActionResult Login([FromBody]LoginViewModel viewModel)
        {
            if (!this.ModelState.IsValid)
            {
                return BadRequest("Login's properties are not valid.");
            }

            var token = _authenticationService.Login(viewModel.Username, viewModel.Password);
            var loggedUser = _authenticationService.GetByLogin(viewModel.Username);

            var model = _mapper.Map<UserViewModel>(loggedUser);
            model.Token = token;

            return Ok(model);
        }

        public IActionResult Register([FromBody]RegistrationViewModel viewModel)
        {
            if (!this.ModelState.IsValid)
            {
                return BadRequest("User's properties are not valid.");
            }

            _authenticationService.Register(_mapper.Map<User>(viewModel));

            return Ok();
        }
    }
}
