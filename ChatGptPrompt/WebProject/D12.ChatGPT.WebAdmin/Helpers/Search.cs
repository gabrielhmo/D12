using System.Collections.Generic;

namespace D12.ChatGPT.WebAdmin.Helpers
{
    public class Search
    {
        public List<string> Filters { get; set; }
        public Search()
        {
            this.Filters = new List<string>();
        }
    }
}