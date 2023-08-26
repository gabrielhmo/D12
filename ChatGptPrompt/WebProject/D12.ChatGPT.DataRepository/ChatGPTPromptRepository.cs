using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;

namespace D12.ChatGPT.DataRepository.Interface
{
    public class ChatGPTPromptRepository : Repository<ChatGptPrompt>, IChatGPTPromptRepository
    {
        public ChatGPTPromptRepository(HOnlineDbContext context) : base(context) { }
    }
}
