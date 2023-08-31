using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DataRepository.Interface;
using D12.ChatGPT.DTO;
using System.Security;

namespace D12.ChatGPT.DataRepository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly HOnlineDbContext dbContext;
        public UnitOfWork(HOnlineDbContext context)
        {
            dbContext = context;

            //ChatGPT
            Client = new ClientRepository(dbContext);
            ClientCompany = new ClientCompanyRepository(dbContext);
            BusinessTypeOffer = new BusinessTypeOfferRepository(dbContext);
            ClientBusinessOffer = new ClientBusinessOfferRepository(dbContext);
            SeoCampaign = new SeoCampaignRepository(dbContext);
            SeoToneVoice = new SeoToneVoiceRepository(dbContext);
            ChatGptPromptToneVoice = new ChatGPTPromptToneVoiceRepository(dbContext);
            ChatGptPrompt = new ChatGPTPromptRepository(dbContext);
            ChatGPTRol = new ChatGPTRolRepository(dbContext);
            ControlType = new ControlTypeRepository(dbContext);
            Language = new LanguageRepository(dbContext);
            Tense = new TenseRepository(dbContext);
            ChatGPTPromptResult = new ChatGPTPromptResultRepository(dbContext);
            ChatGPTPromptLog = new ChatGPTPromptLogRepository(dbContext);

            //SiteMap
            User = new UserRepository(dbContext);
            UserRoles = new UserRolesRepository(dbContext);
            Rol = new RolRepository(dbContext);
            SiteMap = new SiteMapRepository(dbContext);
            SiteMapAccessPolicies = new SiteMapAccessPoliciesRepository(dbContext);
            SiteMapPolicies = new SiteMapPoliciesRepository(dbContext);
            SiteMapRolPolicy = new SiteMapRolPolicyRepository(dbContext);
        }


        //ChatGPT
        public IClientRepository Client { get; set; }
        public IClientCompanyRepository ClientCompany { get; set; }
        public IBusinessTypeOfferRepository BusinessTypeOffer { get; set; }
        public IClientBusinessOfferRepository ClientBusinessOffer { get; set; }
        public ISeoCampaignRepository SeoCampaign { get; set; }
        public ISeoToneVoiceRepository SeoToneVoice { get; set; }
        public IChatGPTPromptToneVoiceRepository ChatGptPromptToneVoice { get; set; }
        public IChatGPTPromptRepository ChatGptPrompt { get; set; }
        public IChatGPTRolRepository ChatGPTRol { get; set; }
        public IControlTypeRepository ControlType { get; set; }
        public ILanguageRepository Language { get; set; }
        public ITenseRepository Tense { get; set; }
        public IChatGPTPromptResultRepository ChatGPTPromptResult { get; set; }
        public IChatGPTPromptLogRepository ChatGPTPromptLog { get; set; }
        //SiteMap
        public IUserRepository User { get; set; }
        public IUserRolesRepository UserRoles { get; set; }
        public IRolRepository Rol { get; set; }
        public ISiteMapRepository SiteMap { get; set; }
        public ISiteMapAccessPoliciesRepository SiteMapAccessPolicies { get; set; }
        public ISiteMapPoliciesRepository SiteMapPolicies { get; set; }

        public ISiteMapRolPolicyRepository SiteMapRolPolicy { get; set; }

        public int Complete()
        {
            return dbContext.SaveChanges();
        }
        public void Dispose()
        {
            dbContext.Dispose();
        }
    }
}
