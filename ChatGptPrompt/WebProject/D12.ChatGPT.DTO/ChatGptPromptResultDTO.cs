using System;

namespace D12.ChatGPT.DTO
{
    public class ChatGptPromptResultDTO
    {
        public long Id { get; set; }
        public long PromptId { get; set; }
        public string Response { get; set; }
        public DateTime? DateRequest { get; set; }
        public bool Active { get; set; }
        public DateTime? EntryDate { get; set; }
    }
}