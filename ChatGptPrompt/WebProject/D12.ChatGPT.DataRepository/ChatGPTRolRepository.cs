using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DataRepository.Interface;

namespace D12.ChatGPT.DataRepository
{
    public class ChatGPTRolRepository : Repository<ChatGptRol>, IChatGPTRolRepository
    {
        public ChatGPTRolRepository(HOnlineDbContext context) : base(context) { }
    }
}
