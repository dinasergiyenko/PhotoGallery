using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PhotoGallery.DataAccessLayer.Entities
{
    public class Photo
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }
        
        public string Description { get; set; }

        [Required]
        public string Path { get; set; }

        public DateTime CreationDate { get; set; }

        public int AlbumId { get; set; }

        public Album Album { get; set; }

        public List<Comment> Comments { get; set; }
    }
}