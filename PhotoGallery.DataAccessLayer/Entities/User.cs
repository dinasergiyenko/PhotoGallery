using PhotoGallery.DataAccessLayer.Constants;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PhotoGallery.DataAccessLayer.Entities
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(DatabaseConstants.EntityPropertyDefaultLength)]
        public string Login { get; set; }

        [Required]
        [MaxLength(DatabaseConstants.EntityPropertyDefaultLength)]
        public string Password { get; set; }

        [Required]
        [MaxLength(DatabaseConstants.EntityPropertyDefaultLength)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(DatabaseConstants.EntityPropertyDefaultLength)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(DatabaseConstants.EntityPropertyDefaultLength)]
        public string Email { get; set; }

        [MaxLength(DatabaseConstants.EntityPropertyDefaultLength)]
        public string City { get; set; }

        [MaxLength(DatabaseConstants.EntityPropertyDefaultLength)]
        public string FieldOfActivity { get; set; }

        public List<Album> Albums { get; set; }

        public List<Comment> Comments { get; set; }
    }
}
