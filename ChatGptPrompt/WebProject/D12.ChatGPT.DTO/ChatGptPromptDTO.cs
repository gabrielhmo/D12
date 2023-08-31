using D12.ChatGPT.DataModel;
using System;
using System.Collections.Generic;
using System.Xml.Linq;

namespace D12.ChatGPT.DTO
{
    public class ChatGptPromptDTO
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
        public string Prompt { get; set; }
        public int? MinLength { get; set; }
        public int? MaxLength { get; set; }
        public int? MinWord { get; set; }
        public int? MaxWord { get; set; }
        public bool Sent { get; set; }
        public DateTime? SentDate { get; set; }
        public bool Active { get; set; }
        public List<ChatGptPromptToneVoiceDTO> ToneVoices { get; set; }
        public List<ChatGptPromptResultDTO> Result { get; set; }

        public ChatGptPromptDTO()
        {
            ChatGptRolId = 2;
            LanguageCode = "ENG";
            Active = true;
        }
    }
}