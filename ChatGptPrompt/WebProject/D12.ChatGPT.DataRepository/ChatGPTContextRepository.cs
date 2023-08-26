using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DataRepository.Interface;

namespace D12.ChatGPT.DataRepository
{
    public class ChatGPTContextRepository : Repository<ChatGptContext>, IChatGPTContextRepository
    {
        public ChatGPTContextRepository(HOnlineDbContext context) : base(context) { }
    }
}
