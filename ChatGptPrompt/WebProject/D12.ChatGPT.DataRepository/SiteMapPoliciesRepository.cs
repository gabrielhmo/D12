using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DataRepository.Interface;
using D12.ChatGPT.DTO;
using System.Linq;

namespace D12.ChatGPT.DataRepository
{
    public class SiteMapPoliciesRepository : Repository<SiteMapPolicies>, ISiteMapPoliciesRepository
    {
        public SiteMapPoliciesRepository(HOnlineDbContext context) : base(context) { }

        public SiteMapPolicies GetPolicyBySiteMapIdRoleId(int siteMapId, string roleId)
        {
            return dbContext.SiteMapPolicies
                .Where(x => x.SiteMapId == siteMapId && x.RolId == roleId)
                .FirstOrDefault();
        }
        public SiteMapRolPolicyDTO GetPolicyBySiteMapByUser(string userId, string siteMapName)
        {
            return dbContext.SpGetSiteMapPolicy(userId, siteMapName)
                .Select(x=> new SiteMapRolPolicyDTO { 
                    SiteMapId = (short)x.SiteMapId, 
                    SiteMapName = x.SiteName, 
                    Read = (bool)x.Read, 
                    Write = (bool)x.Write 
                })
                .FirstOrDefault();
        }
    }
}
