using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhotoGallery.BusinessLogicLayer.Interfaces;
using PhotoGallery.Models;
using System.Collections.Generic;

namespace PhotoGallery.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class UserController : BaseController
    {
        private readonly IUserService _userService;
        private readonly IAlbumService _albumService;
        private readonly IMapper _mapper;

        public UserController(
            IUserService userService,
            IAlbumService albumService,
            IMapper mapper
            )
        {
            _userService = userService;
            _albumService = albumService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult Get(int userId)
        {
            var user = _userService.GetById(userId);

            return Ok(_mapper.Map<UserViewModel>(user));
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetPage(int userId, int albumsPageNumber, int albumsPageSize)
        {
            var user = _userService.GetById(userId);

            return Ok(new UserPageViewModel
            {
                User = _mapper.Map<UserViewModel>(user),
                Albums = _mapper.Map<IEnumerable<AlbumViewModel>>(_albumService.GetByUser(userId, albumsPageNumber, albumsPageSize))
            });

        }
    }
}
