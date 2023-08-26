using System;
using System.Collections.Generic;
namespace D12.ChatGPT.DTO
{
    public class SeoCampaignDTO
    {
        public long Id { get; set; }
        public int CompanyId { get; set; }
        public int BusinessOfferId { get; set; }
        public string Company { get; set; }
        public string BusinessOffer { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Market { get; set; }
        public string PrimaryKeyword { get; set; }
        public string Keywords { get; set; }
        public bool Active { get; set; }
        public DateTime EntryDate { get; set; }

        public ICollection<ChatGptContextDTO> ChatGptContext { get; set; }

        public SeoCampaignDTO()
        {
            Active = true;
            EntryDate = DateTime.Now;
            ChatGptContext = new List<ChatGptContextDTO>();
        }
    }
}
