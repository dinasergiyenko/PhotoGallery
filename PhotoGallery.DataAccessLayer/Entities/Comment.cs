using PhotoGallery.DataAccessLayer.Constants;
using System;
using System.ComponentModel.DataAnnotations;

namespace PhotoGallery.DataAccessLayer.Entities
{
    public class Comment
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(DatabaseConstants.EntityDescriptionLength)]
        public string Text { get; set; }

        public DateTime CreationDate { get; set; }

        public int UserId { get; set; }

        public int PhotoId { get; set; }

        public virtual User User { get; set; }

        public virtual Photo Photo { get; set; }
    }
}