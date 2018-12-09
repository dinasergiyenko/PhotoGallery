using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhotoGallery.BusinessLogicLayer.Interfaces;
using PhotoGallery.DataAccessLayer.Entities;
using PhotoGallery.Models;
using System.Linq;
using System.Security.Claims;

namespace PhotoGallery.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class AlbumController : Controller
    {
        private readonly IAlbumService _albumService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public AlbumController(
            IAlbumService albumService,
            IUserService userService,
            IMapper mapper
            )
        {
            _albumService = albumService;
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult Add([FromBody]AlbumViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Album properties are not valid.");
            }

            var album = _mapper.Map<Album>(viewModel);
            var userId = GetCurrentUserId();
            album.UserId = userId;

            _albumService.Add(album);

            return Ok(userId);
        }

        private int GetCurrentUserId()
        {
            return int.Parse(User.Identity.Name);
        }
    }
}
