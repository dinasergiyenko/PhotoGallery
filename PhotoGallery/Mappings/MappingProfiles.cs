using AutoMapper;
using PhotoGallery.DataAccessLayer.Entities;
using PhotoGallery.Models;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using PhotoGallery.Common.Settings;

namespace PhotoGallery.Mappings
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<User, UserViewModel>()
                .ForMember(dest => dest.Username, options => options.MapFrom(src => src.Login))
                .ForMember(dest => dest.Password, options => options.Ignore());

            CreateMap<RegistrationViewModel, User>()
                .ForMember(dest => dest.Login, options => options.MapFrom(src => src.Username))
                ;

            CreateMap<AlbumViewModel, Album>()
                .ReverseMap();

            CreateMap<AddPhotoViewModel, Photo>();
            CreateMap<UpdatePhotoViewModel, Photo>();
            CreateMap<Photo, PhotoViewModel>()
                .AfterMap<SetAbsolutePathAction>();

            CreateMap<AddCommentViewModel, Comment>();
            CreateMap<Comment, CommentViewModel>()
                .ForMember(dest => dest.Username, options => options.MapFrom(src => src.User.Login));
        }
    }

    public class SetAbsolutePathAction : IMappingAction<Photo, PhotoViewModel>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly AppSettings _appSettings;

        public SetAbsolutePathAction(
            IHttpContextAccessor httpContextAccessor,
            IOptions<AppSettings> appSettings)
        {
            _httpContextAccessor = httpContextAccessor;
            _appSettings = appSettings.Value;
        }

        public void Process(Photo source, PhotoViewModel destination)
        {
            var request = _httpContextAccessor.HttpContext.Request;
            destination.Path = string.Format(_appSettings.PhotosAbsoluteUrl, request.Scheme, request.Host.Value, source.Path);
        }
    }
}
