using EntityFrameworkPaginate;
using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DataRepository.Interface;
using D12.ChatGPT.DTO;
using System.Collections.Generic;
using System.Linq;

namespace D12.ChatGPT.DataRepository
{
    public class UserRolesRepository : Repository<AspNetUserRoles>, IUserRolesRepository
    {
        public UserRolesRepository(HOnlineDbContext context) : base(context)
        {
        }

        public void AddUserRolDTO(UserRolesDTO userRoleInfo)
        {
            throw new System.NotImplementedException();
        }

        public bool DeleteUserRoles(string userId, string rolId)
        {
            throw new System.NotImplementedException();
        }

        public AspNetUserRoles GetUserRoleInfo(string userId, string rolId)
        {
            return dbContext.AspNetUserRoles.Where(x => x.UserId == userId && x.RoleId == rolId).FirstOrDefault();
        }

        public Page<UserRolesDTO> GetUserRolesDTO(int pageNumber, int pageSize, Sorts<UserRolesDTO> sort = null, Filters<UserRolesDTO> filter = null)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<UserRolesDTO> LoadRolesByRolId(string rolId)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<UserRolesDTO> LoadRolesByUserId(string userId)
        {
            throw new System.NotImplementedException();
        }
    }
}
