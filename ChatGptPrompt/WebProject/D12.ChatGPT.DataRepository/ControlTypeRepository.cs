using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;

namespace D12.ChatGPT.DataRepository.Interface
{
    public class ControlTypeRepository : Repository<ControlType>, IControlTypeRepository
    {
        public ControlTypeRepository(HOnlineDbContext context) : base(context) { }
    }
}
