using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using PhotoGallery.DataAccessLayer.Entities;

namespace PhotoGallery.DataAccessLayer.Repositories
{
    public class UserRepository : GenericRepository<User, int>
    {
        public UserRepository(DatabaseContext db) : base(db)
        {
        }

        public override IEnumerable<User> Find(
            Expression<Func<User, bool>> predicate,
            int pageNumber = 0,
            int pageSize = 0)
        {
            return DbSet
                .Include(x => x.Albums)
                .Where(predicate)
                .AsEnumerable();
        }

        public override User Get(int id)
        {
            return Find(x => x.Id == id).FirstOrDefault();
        }
    }
}