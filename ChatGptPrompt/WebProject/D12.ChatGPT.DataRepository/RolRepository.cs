using EntityFrameworkPaginate;
using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DataRepository.Interface;
using D12.ChatGPT.DTO;
using System.Collections.Generic;
using System.Linq;

namespace D12.ChatGPT.DataRepository
{
    public class RolRepository : Repository<AspNetRoles>, IRolRepository
    {
        public RolRepository(HOnlineDbContext context) : base(context) { }
        public Page<RolDTO> GetRolDTO(int pageNumber, int pageSize, Sorts<RolDTO> sort = null, Filters<RolDTO> filter = null)
        {
            if (sort == null)
                sort = new Sorts<RolDTO>();

            if (filter == null)
                filter = new Filters<RolDTO>();

            return dbContext.AspNetRoles
                .Select(x => new RolDTO
                {
                    Id = x.Id,
                    Name = x.Name
                })
                .Paginate<RolDTO>(pageNumber, pageSize, sort, filter);
        }
        public RolDTO LoadRolDTO(string id)
        {
            return dbContext.AspNetRoles
                .Where(x => x.Id == id)
                .Select(x => new RolDTO
                {
                    Id = x.Id,
                    Name = x.Name
                })
                .FirstOrDefault();
        }
        public IEnumerable<SelectItemsDTO> GetRolesSelectList()
        {
            return dbContext.AspNetRoles
                .Select(x => new SelectItemsDTO { Id = x.Id.ToString(), Text = x.Name })
                .ToList();
        }
    }
}
