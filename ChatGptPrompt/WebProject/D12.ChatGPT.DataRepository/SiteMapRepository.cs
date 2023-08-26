using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DataRepository.Interface;

namespace D12.ChatGPT.DataRepository
{
    public class SiteMapRepository : Repository<SiteMap>, ISiteMapRepository
    {
        public SiteMapRepository(HOnlineDbContext context) : base(context)
        {
        }
    }
}
