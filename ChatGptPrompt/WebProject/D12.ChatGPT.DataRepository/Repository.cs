using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataRepository.Interface;
using EntityFrameworkPaginate;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Data.Entity.Infrastructure;

namespace D12.ChatGPT.DataRepository
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly HOnlineDbContext dbContext;
        protected readonly DbSet<TEntity> dbSet;
        public Repository(HOnlineDbContext context)
        {
            dbContext = context;
            dbSet = context.Set<TEntity>();

            dbContext.Configuration.AutoDetectChangesEnabled = true;
        }
        public void Add(TEntity entity)
        {
            dbContext.Set<TEntity>().Add(entity);
        }

        public void Update(TEntity entity)
        {
            //dbContext.Entry<TEntity>(currentVal).CurrentValues.SetValues(newVal);
            dbSet.Attach(entity);
            var entry = dbContext.Entry(entity);
            entry.State = EntityState.Modified;
        }

        public void AddRange(IEnumerable<TEntity> entities)
        {
            dbContext.Set<TEntity>().AddRange(entities);
        }

        public long Count()
        {
            return dbContext.Set<TEntity>().Count();
        }

        public TEntity Get(string id, bool lazyLoading = true)
        {
            dbContext.Configuration.LazyLoadingEnabled = lazyLoading;
            return dbContext.Set<TEntity>().Find(id);
        }

        public TEntity Get(short id, bool lazyLoading = true)
        {
            dbContext.Configuration.LazyLoadingEnabled = lazyLoading;
            return dbContext.Set<TEntity>().Find(id);
        }

        public TEntity Get(int id, bool lazyLoading = true)
        {
            dbContext.Configuration.LazyLoadingEnabled = lazyLoading;
            return dbContext.Set<TEntity>().Find(id);
        }

        public TEntity Get(long id, bool lazyLoading = true)
        {
            dbContext.Configuration.LazyLoadingEnabled = lazyLoading;
            return dbContext.Set<TEntity>().Find(id);
        }

        public TEntity Get(Expression<Func<TEntity, bool>> filter = null, string includeProperties = "")
        {
            IQueryable<TEntity> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

                return query.FirstOrDefault();
        }

        public IEnumerable<TEntity> GetAll()
        {
            return dbContext.Set<TEntity>().ToList();
        }

        public IEnumerable<TEntity> SelectList(Expression<Func<TEntity, TEntity>> selector, Expression<Func<TEntity, bool>> filter = null,
                    Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
                    string includeProperties = "")
        {
            IQueryable<TEntity> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Select(selector).Include(includeProperty);
            }

            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }


        public IEnumerable<TEntity> GetAll(
                    Expression<Func<TEntity, bool>> filter = null,
                    Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
                    string includeProperties = "")
        {
            IQueryable<TEntity> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }

        public Page<TEntity> GetPaginated(int pageNumber, int pageSize, Sorts<TEntity> sort = null, Filters<TEntity> filter = null, string includeProperties = "")
        {
            IQueryable<TEntity> query = dbSet;

            if (sort == null)
                sort = new Sorts<TEntity>();

            if (filter == null)
                filter = new Filters<TEntity>();

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            dbContext.Configuration.LazyLoadingEnabled = false;
            return query.Paginate<TEntity>(pageNumber, pageSize, sort, filter);
        }


        public Page<TEntity> GetPaginated(int pageNumber, int pageSize, Sorts<TEntity> sort = null, Filters<TEntity> filter = null)
        {
            if (sort == null)
                sort = new Sorts<TEntity>();

            if (filter == null)
                filter = new Filters<TEntity>();

            dbContext.Configuration.LazyLoadingEnabled = false;
            return dbContext.Set<TEntity>().Paginate<TEntity>(pageNumber, pageSize, sort, filter);
        }

        public void RemoveStateless(TEntity entity) {
            dbContext.Set<TEntity>().Attach(entity);
            dbContext.Set<TEntity>().Remove(entity);
        }

        public void Remove(TEntity entity)
        {
            dbContext.Set<TEntity>().Remove(entity);
        }

        public void RemoveRange(IEnumerable<TEntity> entities)
        {
            dbContext.Set<TEntity>().RemoveRange(entities);
        }

        public TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return dbContext.Set<TEntity>().SingleOrDefault(predicate);
        }

        public ICollection<ValidationResult> ValidationClass(TEntity entity)
        {
            ICollection<ValidationResult> results = new List<ValidationResult>();
            Validator.TryValidateObject(entity, new ValidationContext(entity), results, false);

            return results;
        }

        public void DetachObject(TEntity entity)
        {
            ((IObjectContextAdapter)dbContext).ObjectContext.Detach(entity);
        }
    }
}
