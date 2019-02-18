using System;

namespace PhotoGallery.Models
{
    public class AddCommentViewModel
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public DateTime CreationDate { get; set; }

        public int UserId { get; set; }

        public int PhotoId { get; set; }
    }
}