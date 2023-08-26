using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;
namespace D12.ChatGPT.DataRepository.Interface
{
    public class ClientCompanyRepository : Repository<ClientCompany>, IClientCompanyRepository
    {
        public ClientCompanyRepository(HOnlineDbContext context) : base(context) { }
    }
}
