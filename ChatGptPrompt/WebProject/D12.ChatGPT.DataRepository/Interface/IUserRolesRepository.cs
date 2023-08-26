using EntityFrameworkPaginate;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DTO;
using System.Collections.Generic;

namespace D12.ChatGPT.DataRepository.Interface
{
    public interface IUserRolesRepository : IRepository<AspNetUserRoles>
    {
        AspNetUserRoles GetUserRoleInfo(string userId, string rolId);
        IEnumerable<UserRolesDTO> LoadRolesByUserId(string userId);
        IEnumerable<UserRolesDTO> LoadRolesByRolId(string rolId);
        void AddUserRolDTO(UserRolesDTO userRoleInfo);

        bool DeleteUserRoles(string userId, string rolId);

        /// <summary>
        /// Get all records in paging mode, defualt page 1 and first 100 records.
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="sort"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        Page<UserRolesDTO> GetUserRolesDTO(int pageNumber, int pageSize, Sorts<UserRolesDTO> sort = null, Filters<UserRolesDTO> filter = null);

    }
}
