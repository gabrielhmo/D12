using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;

namespace D12.ChatGPT.DataRepository.Interface
{
    public class LanguageRepository : Repository<Language>, ILanguageRepository
    {
        public LanguageRepository(HOnlineDbContext context) : base(context) { }
    }
}
