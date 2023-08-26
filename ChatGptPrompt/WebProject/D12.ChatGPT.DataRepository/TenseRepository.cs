using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;

namespace D12.ChatGPT.DataRepository.Interface
{
    public class TenseRepository : Repository<Tenses>, ITenseRepository
    {
        public TenseRepository(HOnlineDbContext context) : base(context) { }
    }
}
