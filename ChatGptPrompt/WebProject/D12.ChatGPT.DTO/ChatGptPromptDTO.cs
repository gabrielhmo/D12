using System;
using System.Collections.Generic;

namespace D12.ChatGPT.DTO
{
    public class ChatGptPromptDTO
    {
        public long Id { get; set; }
        public long ContextId { get; set; }
        public string Prompt { get; set; }
        public bool Sent { get; set; }
        public DateTime? SentDate { get; set; }

        public ICollection<ChatGptPromptResultDTO> ChatGptPromptResult { get; set; }
        public ICollection<ChatGptPromptLogDTO> ChatGptPromptLog { get; set; }

        public ChatGptPromptDTO()
        {
            Sent = false;
        }
    }
}
