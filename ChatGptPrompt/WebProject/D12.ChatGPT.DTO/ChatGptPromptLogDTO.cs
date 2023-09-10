using System;
using System.Xml.Linq;

namespace D12.ChatGPT.DTO
{
    public class ChatGptPromptLogDTO
    {
        public long Id { get; set; }
        public long CampaignId { get; set; }
        public string Message { get; set; }
        public string Type { get; set; }
        public string Code { get; set; }
        public string Param { get; set; }
        public DateTime EntryDate { get; set; }
    }
}