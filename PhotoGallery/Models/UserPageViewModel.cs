using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoGallery.Models
{
    public class UserPageViewModel
    {
        public UserViewModel User { get; set; }
        public IEnumerable<AlbumViewModel> Albums { get; set; }
    }
}
