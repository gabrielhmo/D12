using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DataRepository.Interface;

namespace D12.ChatGPT.DataRepository
{
    public class BusinessTypeOfferRepository : Repository<BusinessTypeOffer>, IBusinessTypeOfferRepository
    {
        public BusinessTypeOfferRepository(HOnlineDbContext context) : base(context) { }
    }
}
