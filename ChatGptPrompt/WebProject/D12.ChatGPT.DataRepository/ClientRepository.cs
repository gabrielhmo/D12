using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;

namespace D12.ChatGPT.DataRepository.Interface
{
    public class ClientRepository : Repository<Client>, IClientRepository
    {
        public ClientRepository(HOnlineDbContext context) : base(context) { }
    }
}
