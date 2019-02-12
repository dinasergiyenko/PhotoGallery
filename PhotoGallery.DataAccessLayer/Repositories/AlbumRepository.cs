using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using PhotoGallery.DataAccessLayer.Entities;

namespace PhotoGallery.DataAccessLayer.Repositories
{
    public class AlbumRepository : GenericRepository<Album, int>
    {
        public AlbumRepository(DatabaseContext db) : base(db)
        {
        }

        public override IEnumerable<Album> Find(
            Expression<Func<Album, bool>> predicate,
            int pageNumber = 0,
            int pageSize = 0)
        {
            return DbSet
                .Include(x => x.User)
                .Include(x => x.Photos)
                .Where(predicate)
                .AsEnumerable();
        }

        public override Album Get(int id)
        {
            return Find(x => x.Id == id).FirstOrDefault();
        }
    }
}