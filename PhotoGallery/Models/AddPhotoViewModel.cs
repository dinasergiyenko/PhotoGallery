using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace PhotoGallery.Models
{
    public class AddPhotoViewModel
    {
        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public IFormFile File { get; set; }

        [Required]
        public int AlbumId { get; set; }

        [Required]
        public int UserId { get; set; }
    }
}
