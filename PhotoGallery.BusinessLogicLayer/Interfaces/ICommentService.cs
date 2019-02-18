using PhotoGallery.DataAccessLayer.Entities;
using System.Collections.Generic;

namespace PhotoGallery.BusinessLogicLayer.Interfaces
{
    public interface ICommentService
    {
        IEnumerable<Comment> GetByPhotoId(int photoId, int pageNumber, int pageSize);
        void Add(Comment comment);
    }
}
