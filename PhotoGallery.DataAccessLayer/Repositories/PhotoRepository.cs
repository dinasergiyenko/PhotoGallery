using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using PhotoGallery.DataAccessLayer.Entities;

namespace PhotoGallery.DataAccessLayer.Repositories
{
    public class PhotoRepository : GenericRepository<Photo, int>
    {
        public PhotoRepository(DatabaseContext db) : base(db)
        {
        }

        public override IEnumerable<Photo> Find(
            Expression<Func<Photo, bool>> predicate,
            int pageNumber = 0,
            int pageSize = 0)
        {
            var query = DbSet
                .Include(x => x.Album)
                .Include(x => x.Album.User)
                .Where(predicate);

            if (pageSize != 0)
            {
                query = query
                    .Skip(pageNumber * pageSize)
                    .Take(pageSize);
            }

            return query
                .AsEnumerable();
        }

        public override Photo Get(int id)
        {
            return Find(x => x.Id == id).FirstOrDefault();
        }
    }
}