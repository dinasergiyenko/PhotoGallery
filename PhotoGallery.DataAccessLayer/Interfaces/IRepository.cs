using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace PhotoGallery.DataAccessLayer.Interfaces
{
    public interface IRepository<TEntity, TKey> where TEntity : class
    {
        TEntity Get(TKey id);

        IEnumerable<TEntity> GetAll();

        void Add(TEntity entity);

        IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate, int pageNumber = 0, int pageSize = 0);

        void RemoveById(TKey id);

        void Remove(TEntity entity);
    }
}