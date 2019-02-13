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
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace PhotoGallery.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class PhotoController : BaseController
    {
        private readonly IPhotoService _photoService;
        private readonly IMapper _mapper;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IFileUploadService _fileUploadService;

        public PhotoController(
            IPhotoService photoService,
            IMapper mapper,
            IHostingEnvironment hostingEnvironment,
            IFileUploadService fileUploadService
            )
        {
            _photoService = photoService;
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

            if (!IsCurrentUser(viewModel.UserId))
            {
                return BadRequest("User credentials are not valid.");
            }

            var photo = GetMappedPhoto(viewModel);

            _photoService.Add(photo);

            return Ok(viewModel.AlbumId);
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
        public IActionResult GetPage(int id)
        {
            var photo = _photoService.GetById(id);

            return Ok(new PhotoPageViewModel
            {
                Photo = _mapper.Map<PhotoViewModel>(photo),
                Album = _mapper.Map<AlbumViewModel>(photo.Album),
                User = _mapper.Map<UserViewModel>(photo.Album.User)
            });
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetByAlbum(int albumId, int pageNumber, int pageSize)
        {
            var photos = _photoService.GetByAlbumId(albumId, pageNumber, pageSize);

            return Ok(_mapper.Map<IEnumerable<PhotoViewModel>>(photos));
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetPhotos(int pageNumber, int pageSize)
        {
            var photos = _photoService
                .GetPhotos(pageNumber, pageSize)
                .OrderByDescending(x => x.CreationDate);

            return Ok(_mapper.Map<IEnumerable<PhotoViewModel>>(photos));
        }

        [HttpPost]
        public IActionResult Update([FromBody]UpdatePhotoViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Photo properties are not valid.");
            }

            if (!IsCurrentUser(viewModel.UserId))
            {
                return BadRequest("User credentials are not valid.");
            }

            var photo = _mapper.Map<Photo>(viewModel);

            _photoService.Update(photo);

            return Ok(viewModel.UserId);
        }

        private Photo GetMappedPhoto(AddPhotoViewModel viewModel)
        {
            var photo = _mapper.Map<Photo>(viewModel);

            photo.Path = UploadFile(viewModel.File);
            photo.CreationDate = DateTime.Now;

            return photo;
        }

        private string UploadFile(IFormFile file)
        {
            return _fileUploadService.Upload(file, _hostingEnvironment.WebRootPath);
        }
    }
}
