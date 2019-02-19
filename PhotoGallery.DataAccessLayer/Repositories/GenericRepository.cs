using Microsoft.EntityFrameworkCore;
using PhotoGallery.DataAccessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace PhotoGallery.DataAccessLayer.Repositories
{
    public class GenericRepository<TEntity, TKey> : IRepository<TEntity, TKey> where TEntity: class
    {
        protected readonly DbSet<TEntity> DbSet;

        public GenericRepository(DatabaseContext db)
        {
            DbSet = db.Set<TEntity>();
        }

        public virtual void Add(TEntity entity)
        {
            DbSet.Add(entity);
        }

        public virtual IEnumerable<TEntity> Find(
            Expression<Func<TEntity, bool>> predicate,
            int pageNumber = 0,
            int pageSize = 0)
        {
            return GetPage(DbSet.Where(predicate), pageNumber, pageSize)
                .AsEnumerable();
        }

        public virtual TEntity Get(TKey id)
        {
            return DbSet.Find(id);
        }

        public virtual IEnumerable<TEntity> GetAll()
        {
            return Find(x => true).AsEnumerable();
        }

        public virtual void RemoveById(TKey id)
        {
            var entity = DbSet.Find(id);
            DbSet.Remove(entity);
        }

        public virtual void Remove(TEntity entity)
        {
            DbSet.Remove(entity);
        }

        public IQueryable<TEntity> GetPage(IQueryable<TEntity> query, int pageNumber, int pageSize)
        {
            return pageSize != 0
                ? query
                    .Skip(pageNumber * pageSize)
                    .Take(pageSize)
                : query;
        }
    }
}
