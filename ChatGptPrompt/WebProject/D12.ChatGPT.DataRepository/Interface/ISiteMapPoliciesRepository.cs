using D12.ChatGPT.DataModel;
using D12.ChatGPT.DTO;

namespace D12.ChatGPT.DataRepository.Interface
{
    public interface ISiteMapPoliciesRepository : IRepository<SiteMapPolicies>
    {
        SiteMapPolicies GetPolicyBySiteMapIdRoleId(int siteMapId, string roleId);
        SiteMapRolPolicyDTO GetPolicyBySiteMapByUser(string userId, string siteMapName);
    }
}