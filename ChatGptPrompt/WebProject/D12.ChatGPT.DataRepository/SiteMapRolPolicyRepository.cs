using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DataRepository.Interface;

namespace D12.ChatGPT.DataRepository
{
    public class SiteMapRolPolicyRepository : Repository<SpGetSiteMapPolicyReturnModel>, ISiteMapRolPolicyRepository
    {
        public SiteMapRolPolicyRepository(HOnlineDbContext context) : base(context) { }


    }
}
