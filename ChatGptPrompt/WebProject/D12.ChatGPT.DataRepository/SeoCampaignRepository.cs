using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;

namespace D12.ChatGPT.DataRepository.Interface
{
    public class SeoCampaignRepository : Repository<SeoCampaign>, ISeoCampaignRepository
    {
        public SeoCampaignRepository(HOnlineDbContext context) : base(context) { }
    }
}
