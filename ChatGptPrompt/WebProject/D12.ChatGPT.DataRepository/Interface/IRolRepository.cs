using EntityFrameworkPaginate;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DTO;
using System.Collections.Generic;

namespace D12.ChatGPT.DataRepository.Interface
{
    public interface IRolRepository : IRepository<AspNetRoles>
    {
        Page<RolDTO> GetRolDTO(int pageNumber, int pageSize, Sorts<RolDTO> sort = null, Filters<RolDTO> filter = null);
        RolDTO LoadRolDTO(string id);
        IEnumerable<SelectItemsDTO> GetRolesSelectList();
    }
}
