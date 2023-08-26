using EntityFrameworkPaginate;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;

namespace D12.ChatGPT.DataRepository.Interface
{
    public interface IRepository<TEntity> where TEntity : class
    {
        ICollection<ValidationResult> ValidationClass(TEntity entity);

        /// <summary>
        /// Get record by EmpleadoId
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        TEntity Get(string id, bool lazyLoading = true);

        /// <summary>
        /// Get record by EmpleadoId
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        TEntity Get(short id, bool lazyLoading = true);

        /// <summary>
        /// Get record by EmpleadoId
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        TEntity Get(int id, bool lazyLoading = true);

        /// <summary>
        /// Get record by EmpleadoId
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        TEntity Get(long id, bool lazyLoading = true);

        /// <summary>
        /// Get all records
        /// </summary>
        /// <returns></returns>
        TEntity Get(Expression<Func<TEntity, bool>> filter = null, string includeProperties = "");


        /// <summary>
        /// Return total records
        /// </summary>
        /// <returns></returns>
        Int64 Count();

        /// <summary>
        /// Get all records
        /// </summary>
        /// <returns></returns>
        IEnumerable<TEntity> GetAll();

        /// <summary>
        /// Get all records
        /// </summary>
        /// <returns></returns>
        IEnumerable<TEntity> GetAll(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "");

        IEnumerable<TEntity> SelectList(Expression<Func<TEntity, TEntity>> selector, Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "");

        /// <summary>
        /// Get all records in paging mode, defualt page 1 and first 100 records.
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="sort"></param>
        /// <param name="filter"></param>
        /// <param name="includeProperties"></param>
        /// <returns></returns>
        Page<TEntity> GetPaginated(int pageNumber, int pageSize, Sorts<TEntity> sort = null, Filters<TEntity> filter = null, string includeProperties = "");

        /// <summary>
        /// Get all records in paging mode, defualt page 1 and first 100 records.
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="sort"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        Page<TEntity> GetPaginated(int pageNumber, int pageSize, Sorts<TEntity> sort = null, Filters<TEntity> filter = null);

        /// <summary>
        /// Search record
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate);

        /// <summary>
        /// Add Entity
        /// </summary>
        /// <param name="entity"></param>
        void Add(TEntity entity);

        /// <summary>
        /// Add Entity
        /// </summary>
        /// <param name="entity"></param>
        void Update(TEntity entity);

        /// <summary>
        /// Add Entities Range
        /// </summary>
        /// <param name="entities"></param>
        void AddRange(IEnumerable<TEntity> entities);

        // Detach the object from the context
        void DetachObject(TEntity entity);

        /// <summary>
        /// Remove Single Entity
        /// </summary>
        /// <param name="entity"></param>
        void RemoveStateless(TEntity entity);


        /// <summary>
        /// Remove Single Entity
        /// </summary>
        /// <param name="entity"></param>
        void Remove(TEntity entity);

        /// <summary>
        /// Remove Entity Range
        /// </summary>
        /// <param name="entities"></param>
        void RemoveRange(IEnumerable<TEntity> entities);
    }
}
