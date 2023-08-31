using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DataRepository.Interface;

namespace D12.ChatGPT.DataRepository
{
    public class ChatGPTPromptToneVoiceRepository : Repository<ChatGptPromptToneVoice>, IChatGPTPromptToneVoiceRepository
    {
        public ChatGPTPromptToneVoiceRepository(HOnlineDbContext context) : base(context) { }
    }
}
