using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using PhotoGallery.BusinessLogicLayer.Interfaces;
using PhotoGallery.DataAccessLayer.Entities;
using PhotoGallery.Models;
using PhotoGallery.Services;
using System;
using System.Collections.Generic;
using System.IO;

namespace PhotoGallery.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class PhotoController : Controller
    {
        private readonly IPhotoService _photoService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IFileUploadService _fileUploadService;

        public PhotoController(
            IPhotoService photoService,
            IUserService userService,
            IMapper mapper,
            IHostingEnvironment hostingEnvironment,
            IFileUploadService fileUploadService
            )
        {
            _photoService = photoService;
            _userService = userService;
            _mapper = mapper;
            _hostingEnvironment = hostingEnvironment;
            _fileUploadService = fileUploadService;
        }

        [HttpPost]
        public IActionResult Add(AddPhotoViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Photo properties are not valid.");
            }

            var userId = GetCurrentUserId();

            if (userId != viewModel.UserId)
            {
                return BadRequest("User credentials are not valid.");
            }

            var fileName = _fileUploadService.Upload(viewModel.File, _hostingEnvironment.WebRootPath);

            var photo = _mapper.Map<Photo>(viewModel);
            photo.Path = fileName;
            photo.CreationDate = DateTime.Now;

            _photoService.Add(photo);

            return Ok(userId);
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult Get(int id)
        {
            var photo = _photoService.GetById(id);

            return Ok(_mapper.Map<PhotoViewModel>(photo));
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetByAlbum(int albumId)
        {
            var photos = _photoService.GetByAlbumId(albumId);

            return Ok(_mapper.Map<IEnumerable<PhotoViewModel>>(photos));
        }

        [HttpPost]
        public IActionResult Update([FromBody]UpdatePhotoViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Photo properties are not valid.");
            }

            var userId = GetCurrentUserId();

            if (userId != viewModel.UserId)
            {
                return BadRequest("User credentials are not valid.");
            }

            var photo = _mapper.Map<Photo>(viewModel);
            _photoService.Update(photo);

            return Ok();
        }

        private int GetCurrentUserId()
        {
            return int.Parse(User.Identity.Name);
        }
    }
}
