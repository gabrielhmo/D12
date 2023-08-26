using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DataRepository.Interface;

namespace D12.ChatGPT.DataRepository
{
    public class ChatGPTContextToneVoiceRepository : Repository<ChatGptContextToneVoice>, IChatGPTContextToneVoiceRepository
    {
        public ChatGPTContextToneVoiceRepository(HOnlineDbContext context) : base(context) { }
    }
}
