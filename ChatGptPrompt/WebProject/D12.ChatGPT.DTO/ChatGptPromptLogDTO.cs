using System;

namespace D12.ChatGPT.DTO
{
    public class ChatGptPromptLogDTO
    {
        public long Id { get; set; }
        public long PromptId { get; set; }
        public string Object { get; set; }
        public DateTime Created { get; set; }
        public string Model { get; set; }
        public int PromptTokens { get; set; }
        public int CompletionTokens { get; set; }
        public int TotalTokens { get; set; }
        public string FinishReason { get; set; }
        public int Index { get; set; }
        public DateTime EntryDate { get; set; }

        public ChatGptPromptLogDTO()
        {
            PromptTokens = 0;
            CompletionTokens = 0;
            TotalTokens = 0;
            Index = 0;
            EntryDate = DateTime.Now;
        }
    }
}