using System;

namespace PhotoGallery.Models
{
    public class CommentViewModel
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public DateTime CreationDate { get; set; }

        public int UserId { get; set; }

        public int PhotoId { get; set; }

        public string Username { get; set; }
    }
}
