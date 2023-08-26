using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;

namespace D12.ChatGPT.DataRepository.Interface
{
    public class ClientBusinessOfferRepository : Repository<ClientBusinessOffer>, IClientBusinessOfferRepository
    {
        public ClientBusinessOfferRepository(HOnlineDbContext context) : base(context) { }
    }
}
