using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using PhotoGallery.DataAccessLayer.Entities;

namespace PhotoGallery.DataAccessLayer.Repositories
{
    public class CommentRepository : GenericRepository<Comment, int>
    {
        public CommentRepository(DatabaseContext db) : base(db)
        {
        }

        public override IEnumerable<Comment> Find(
            Expression<Func<Comment, bool>> predicate,
            int pageNumber = 0,
            int pageSize = 0)
        {
            var query = DbSet
                .Include(x => x.User)
                .Where(predicate);

            return GetPage(query, pageNumber, pageSize)
                .AsEnumerable();
        }
    }
}