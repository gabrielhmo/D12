using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace D12.ChatGPT.DTO
{
    public class SiteMapAccessPoliciesDTO
    {
        public short Id { get; set; }
        public short ParentId { get; set; }
        public string Name { get; set; }
        public short Index { get; set; }
        public string UrlPath { get; set; }
        public bool NewWindows { get; set; }
        public string OnClick { get; set; }
        public bool IsPublic { get; set; }
        public bool Active { get; set; }
        public bool Deleted { get; set; }
        public object PoliciesAccess { get; set; }
    }
}
