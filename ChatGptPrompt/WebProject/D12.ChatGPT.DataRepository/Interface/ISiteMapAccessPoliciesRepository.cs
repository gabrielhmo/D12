using D12.ChatGPT.DataModel;
using D12.ChatGPT.DTO;
using System.Collections.Generic;

namespace D12.ChatGPT.DataRepository.Interface
{
    public interface ISiteMapAccessPoliciesRepository : IRepository<SiteMapPolicies>
    {
        IEnumerable<SiteMapAccessPoliciesDTO> LoadBySiteMapId();
    }
}
