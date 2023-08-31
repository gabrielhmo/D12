using System;
using System.Collections.Generic;
namespace D12.ChatGPT.DTO
{
    public class SeoCampaignFullDTO
    {
        public long Id { get; set; }
        public int CompanyId { get; set; }
        public int BusinessOfferId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Market { get; set; }
        public string PrimaryKeyword { get; set; }
        public string Keywords { get; set; }
        public bool Active { get; set; }
        public DateTime EntryDate { get; set; }

        public ClientCompanyDTO Company { get; set; }
        public ClientBusinessOfferDTO BusinessOffer { get; set; }
        public List<ChatGptPromptDTO> Prompts { get; set; }

        public SeoCampaignFullDTO()
        {
            Active = true;
            EntryDate = DateTime.Now;


        }
    }
}
