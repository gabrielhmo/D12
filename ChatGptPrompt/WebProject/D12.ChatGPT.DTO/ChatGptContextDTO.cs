using System.Collections.Generic;
namespace D12.ChatGPT.DTO
{
    public class ChatGptContextDTO
    {
        public long Id { get; set; }
        public long SeoCampaignId { get; set; }
        public int ChatGptRolId { get; set; }
        public int ControlTypeId { get; set; }
        public string LanguageCode { get; set; }
        public int? TenseId { get; set; }
        public string CampaginName { get; set; }
        public string ChatGptRol { get; set; }
        public string ControlType { get; set; }
        public string Language { get; set; }
        public string Tense { get; set; }
        public string Name { get; set; } 
        public string Context { get; set; }
        public int? MinLength { get; set; }
        public int? MaxLength { get; set; }
        public int? MinWord { get; set; }
        public int? MaxWord { get; set; }
        public bool Active { get; set; }
        public string ToneVoiceIds { get; set; }

        public ICollection<ChatGptPromptDTO> ChatGptPrompt { get; set; }

        public ChatGptContextDTO()
        {
            ChatGptRolId = 2;
            LanguageCode = "ENG";
            Active = true;
        }
    }
}