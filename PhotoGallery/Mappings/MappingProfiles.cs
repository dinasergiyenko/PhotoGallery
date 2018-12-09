using AutoMapper;
using PhotoGallery.DataAccessLayer.Entities;
using PhotoGallery.Models;


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
                .ForMember(dest => dest.Login, options => options.MapFrom(src => src.Username));

            CreateMap<AlbumViewModel, Album>()
                .ReverseMap();
        }
    }
}
