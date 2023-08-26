using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;

namespace D12.ChatGPT.DataRepository.Interface
{
    public class ChatGPTPromptLogRepository : Repository<ChatGptPromptLog>, IChatGPTPromptLogRepository
    {
        public ChatGPTPromptLogRepository(HOnlineDbContext context) : base(context) { }
    }
}
