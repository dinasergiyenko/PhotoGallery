using PhotoGallery.DataAccessLayer.Constants;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PhotoGallery.DataAccessLayer.Entities
{
    public class Album
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(DatabaseConstants.EntityTitleLength)]
        public string Title { get; set; }

        [MaxLength(DatabaseConstants.EntityDescriptionLength)]
        public string Descirption { get; set; }

        public int UserId { get; set; }

        public virtual User User { get; set; }

        public virtual List<Photo> Photos { get; set; }
    }
}