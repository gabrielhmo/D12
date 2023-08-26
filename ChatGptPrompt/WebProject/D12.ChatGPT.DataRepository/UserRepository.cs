using EntityFrameworkPaginate;
using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DataRepository.Interface;
using D12.ChatGPT.DTO;
using System.Data.Entity;
using System.Linq;

namespace D12.ChatGPT.DataRepository
{
    public class UserRepository : Repository<AspNetUsers>, IUserRepository
    {
        public UserRepository(HOnlineDbContext context) : base(context)
        {
        }

        public AspNetUsers GetUserInfo(string id)
        {
            return dbContext.AspNetUsers.Where(x => x.Id == id).FirstOrDefault();
        }

        public UsersDTO LoadUserDTO(string id)
        {
            var userInfo = dbContext.AspNetUsers
            .Include(x => x.AspNetUserRoles)
            .Where(x => x.Id == id)
            .Select(x => new UsersDTO
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                JobTitle = x.JobTitle,
                PhoneNumber = x.PhoneNumber,
                Email = x.Email,
                UserName = x.UserName,
                Active = x.Active,
                ReadOnly = x.ReadOnly,
                Roles = x.AspNetUserRoles.Select(y => new RolDTO { Id = y.RoleId, Name = y.AspNetRoles.Name }).ToList(),
                IsAdmin = false
            })
            .FirstOrDefault();

            return userInfo;
        }

        public Page<UsersDTO> GetUsersDTO(int pageNumber, int pageSize, Sorts<UsersDTO> sort = null, Filters<UsersDTO> filter = null)
        {
            if (sort == null)
                sort = new Sorts<UsersDTO>();

            if (filter == null)
                filter = new Filters<UsersDTO>();

            return dbContext.AspNetUsers
                .Include(x => x.AspNetUserRoles)
                .Select(x => new UsersDTO
                {
                    Id = x.Id,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    JobTitle = x.JobTitle,
                    Email = x.Email,
                    PhoneNumber = x.PhoneNumber,
                    UserName = x.UserName,
                    LastAccess = x.LastAccess,
                    EntryDate = x.EntryDate,
                    Active = x.Active,
                    ReadOnly = x.ReadOnly,
                    Roles = x.AspNetUserRoles.Select(y => new RolDTO { Id = y.RoleId, Name = y.AspNetRoles.Name }).ToList()
                })
                .Paginate<UsersDTO>(pageNumber, pageSize, sort, filter);
        }

        public void AddUserDTO(UsersDTO userInfo)
        {

        }

        public bool DeleteUserById(string id)
        {
            bool result = false;

            try
            {
                AspNetUsers userInfo = new AspNetUsers() { Id = id };
                dbContext.AspNetUsers.Attach(userInfo);
                dbContext.AspNetUsers.Remove(userInfo);

                dbContext.SaveChanges();

                result = true;

            }
            catch (System.Exception)
            {
                result = false;
            }

            return result;
        }
    }
}
