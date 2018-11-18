using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PhotoGallery.DataAccessLayer.Entities
{
    public class Album
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }
        
        public string Descirption { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public List<Photo> Photos { get; set; }
    }
}