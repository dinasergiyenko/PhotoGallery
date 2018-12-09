using System.ComponentModel.DataAnnotations;

namespace PhotoGallery.Models
{
    public class AlbumViewModel
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public int UserId { get; set; }

    }
}
