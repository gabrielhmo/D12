using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;

namespace D12.ChatGPT.DataRepository.Interface
{
    public class ChatGPTPromptResultRepository : Repository<ChatGptPromptResult>, IChatGPTPromptResultRepository
    {
        public ChatGPTPromptResultRepository(HOnlineDbContext context) : base(context) { }
    }
}
