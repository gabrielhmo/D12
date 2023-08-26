using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DataRepository.Interface;
using D12.ChatGPT.DTO;
using System;
using System.Collections.Generic;
using System.Linq;

namespace D12.ChatGPT.DataRepository
{
    public class SiteMapAccessPoliciesRepository : Repository<SiteMapPolicies>, ISiteMapAccessPoliciesRepository
    {
        public SiteMapAccessPoliciesRepository(HOnlineDbContext context) : base(context)
        {
        }

        public IEnumerable<SiteMapAccessPoliciesDTO> LoadBySiteMapId()
        {
            List<SiteMapAccessPoliciesDTO> siteMapAccessPoliciesDTO = new List<SiteMapAccessPoliciesDTO>();
            var SiteMap = dbContext.SiteMap.OrderBy(x=> x.ParentId).ThenBy(x=> x.Index).ToList();

            foreach (var item in SiteMap)
            {
                var siteMap = new SiteMapAccessPoliciesDTO();
                siteMap.PoliciesAccess = new List<PoliciesAccessDTO>();

                siteMap = new SiteMapAccessPoliciesDTO
                {
                    Id = Convert.ToInt16(item.Id),
                    ParentId = item.ParentId,
                    Name = item.Name,
                    Index = (short)item.Index,
                    UrlPath = item.UrlPath,
                    NewWindows = item.NewWindows,
                    OnClick = item.OnClick,
                    IsPublic = item.IsPublic,
                    Active = item.Active,
                    Deleted = item.Deleted,
                    PoliciesAccess = item.SiteMapPolicies
                                        .Select(y => new
                                        {
                                            Id = y.RolId,
                                            Read = (y.Read) ? 1 : 0,
                                            Write = (y.Write) ? 1 : 0
                                        }).ToList()
                };

                siteMapAccessPoliciesDTO.Add(siteMap);
            }

            return siteMapAccessPoliciesDTO;
        }
    }
}
