using System.ComponentModel.DataAnnotations;

namespace PhotoGallery.Models
{
    public class RegistrationViewModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        public string City { get; set; }

        public string FieldOfActivity { get; set; }
    }
}
