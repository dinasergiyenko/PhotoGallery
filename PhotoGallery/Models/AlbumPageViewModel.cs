using System.Collections.Generic;

namespace PhotoGallery.Models
{
    public class AlbumPageViewModel
    {
        public UserViewModel User { get; set; }

        public AlbumViewModel Album { get; set; }

        public IEnumerable<PhotoViewModel> Photos { get; set; }
    }
}