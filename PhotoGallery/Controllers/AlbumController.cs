using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhotoGallery.BusinessLogicLayer.Interfaces;
using PhotoGallery.DataAccessLayer.Entities;
using PhotoGallery.Models;
using System.Collections.Generic;
using PhotoGallery.BusinessLogicLayer.Infrastructure.Exceptions;

namespace PhotoGallery.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class AlbumController : BaseController
    {
        private readonly IAlbumService _albumService;
        private readonly IPhotoService _photoService;
        private readonly IMapper _mapper;

        public AlbumController(
            IAlbumService albumService,
            IPhotoService photoService,
            IMapper mapper
            )
        {
            _albumService = albumService;
            _photoService = photoService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult Get(int id)
        {
            var album = _albumService.GetById(id);
            
            return Ok(_mapper.Map<AlbumViewModel>(album));
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetPage(int id, int photosPageNumber, int photosPageSize)
        {
            var album = _albumService.GetById(id);

            return Ok(new AlbumPageViewModel
            {
                Album = _mapper.Map<AlbumViewModel>(album),
                User = _mapper.Map<UserViewModel>(album.User),
                Photos = _mapper.Map<IEnumerable<PhotoViewModel>>(_photoService.GetByAlbumId(album.Id, photosPageNumber, photosPageSize))
            });
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetByUser(int userId, int pageNumber, int pageSize)
        {
            var albums = _albumService.GetByUser(userId, pageNumber, pageSize);

            return Ok(_mapper.Map<IEnumerable<AlbumViewModel>>(albums));
        }

        [HttpPost]
        public IActionResult Add([FromBody]AlbumViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Album properties are not valid.");
            }

            if (!IsCurrentUser(viewModel.UserId))
            {
                return BadRequest("User credentials are not valid.");
            }

            var album = GetMappedAlbum(viewModel);

            _albumService.Add(album);

            return Ok(album.UserId);
        }

        [HttpPost]
        public IActionResult Update([FromBody]AlbumViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Album properties are not valid.");
            }

            if (!IsCurrentUser(viewModel.UserId))
            {
                return BadRequest("User credentials are not valid.");
            }

            var album = GetMappedAlbum(viewModel);

            _albumService.Update(album);

            return Ok(album.Id);
        }

        [HttpGet]
        public IActionResult IsCurrentAlbumUser(int albumId)
        {
            var album = _albumService.GetById(albumId);

            if (!IsCurrentUser(album.UserId))
            {
                throw new CustomValidationException("No rights to modify this album.");
            }

            return Ok(true);
        }

        private Album GetMappedAlbum(AlbumViewModel viewModel)
        {
            var album = _mapper.Map<Album>(viewModel);

            return album;
        }
    }
}
