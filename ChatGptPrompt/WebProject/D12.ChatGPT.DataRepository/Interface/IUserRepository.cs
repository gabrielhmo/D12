using EntityFrameworkPaginate;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DTO;

namespace D12.ChatGPT.DataRepository.Interface
{
    public interface IUserRepository : IRepository<AspNetUsers>
    {
        AspNetUsers GetUserInfo(string id);
        UsersDTO LoadUserDTO(string id);
        void AddUserDTO(UsersDTO userInfo);

        bool DeleteUserById(string id);

        /// <summary>
        /// Get all records in paging mode, defualt page 1 and first 100 records.
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="sort"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        Page<UsersDTO> GetUsersDTO(int pageNumber, int pageSize, Sorts<UsersDTO> sort = null, Filters<UsersDTO> filter = null);

    }
}
