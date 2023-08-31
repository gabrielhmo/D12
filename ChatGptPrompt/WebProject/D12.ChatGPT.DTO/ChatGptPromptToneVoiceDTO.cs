using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace D12.ChatGPT.DTO
{
    public class ChatGptPromptToneVoiceDTO
    {
        public long Id { get; set; }
        public long PromptId { get; set; }
        public int ToneVoiceId { get; set; }
        public string Tone { get; set; }
    }
}
