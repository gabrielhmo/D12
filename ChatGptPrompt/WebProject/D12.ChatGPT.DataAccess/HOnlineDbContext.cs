using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataAccess
{
    using D12.ChatGPT.DataModel;

    using System.Linq;

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class HOnlineDbContext : System.Data.Entity.DbContext
    {
        public System.Data.Entity.DbSet<AspNetRoles> AspNetRoles { get; set; }
        public System.Data.Entity.DbSet<AspNetUserClaims> AspNetUserClaims { get; set; }
        public System.Data.Entity.DbSet<AspNetUserLogins> AspNetUserLogins { get; set; }
        public System.Data.Entity.DbSet<AspNetUserRoles> AspNetUserRoles { get; set; }
        public System.Data.Entity.DbSet<AspNetUsers> AspNetUsers { get; set; }
        public System.Data.Entity.DbSet<BusinessActivityType> BusinessActivityType { get; set; }
        public System.Data.Entity.DbSet<BusinessTypeOffer> BusinessTypeOffer { get; set; }
        public System.Data.Entity.DbSet<ChatGptPrompt> ChatGptPrompt { get; set; }
        public System.Data.Entity.DbSet<ChatGptPromptLog> ChatGptPromptLog { get; set; }
        public System.Data.Entity.DbSet<ChatGptPromptResult> ChatGptPromptResult { get; set; }
        public System.Data.Entity.DbSet<ChatGptPromptToneVoice> ChatGptPromptToneVoice { get; set; }
        public System.Data.Entity.DbSet<ChatGptRol> ChatGptRol { get; set; }
        public System.Data.Entity.DbSet<Client> Client { get; set; }
        public System.Data.Entity.DbSet<ClientBusinessOffer> ClientBusinessOffer { get; set; }
        public System.Data.Entity.DbSet<ClientCompany> ClientCompany { get; set; }
        public System.Data.Entity.DbSet<ControlType> ControlType { get; set; }
        public System.Data.Entity.DbSet<Language> Language { get; set; }
        public System.Data.Entity.DbSet<SeoCampaign> SeoCampaign { get; set; }
        public System.Data.Entity.DbSet<SeoTag> SeoTag { get; set; }
        public System.Data.Entity.DbSet<SeoTagGroup> SeoTagGroup { get; set; }
        public System.Data.Entity.DbSet<SeoTagGroupType> SeoTagGroupType { get; set; }
        public System.Data.Entity.DbSet<SeoToneVoice> SeoToneVoice { get; set; }
        public System.Data.Entity.DbSet<SiteMap> SiteMap { get; set; }
        public System.Data.Entity.DbSet<SiteMapPolicies> SiteMapPolicies { get; set; }
        public System.Data.Entity.DbSet<Tenses> Tenses { get; set; }

        static HOnlineDbContext()
        {
            System.Data.Entity.Database.SetInitializer<HOnlineDbContext>(null);
        }

        public HOnlineDbContext()
            : base("Name=HOnlineDbContext")
        {
        }

        public HOnlineDbContext(string connectionString)
            : base(connectionString)
        {
        }

        public HOnlineDbContext(string connectionString, System.Data.Entity.Infrastructure.DbCompiledModel model)
            : base(connectionString, model)
        {
        }

        public HOnlineDbContext(System.Data.Common.DbConnection existingConnection, bool contextOwnsConnection)
            : base(existingConnection, contextOwnsConnection)
        {
        }

        public HOnlineDbContext(System.Data.Common.DbConnection existingConnection, System.Data.Entity.Infrastructure.DbCompiledModel model, bool contextOwnsConnection)
            : base(existingConnection, model, contextOwnsConnection)
        {
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

        public bool IsSqlParameterNull(System.Data.SqlClient.SqlParameter param)
        {
            var sqlValue = param.SqlValue;
            var nullableValue = sqlValue as System.Data.SqlTypes.INullable;
            if (nullableValue != null)
                return nullableValue.IsNull;
            return (sqlValue == null || sqlValue == System.DBNull.Value);
        }

        protected override void OnModelCreating(System.Data.Entity.DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Configurations.Add(new AspNetRolesConfiguration());
            modelBuilder.Configurations.Add(new AspNetUserClaimsConfiguration());
            modelBuilder.Configurations.Add(new AspNetUserLoginsConfiguration());
            modelBuilder.Configurations.Add(new AspNetUserRolesConfiguration());
            modelBuilder.Configurations.Add(new AspNetUsersConfiguration());
            modelBuilder.Configurations.Add(new BusinessActivityTypeConfiguration());
            modelBuilder.Configurations.Add(new BusinessTypeOfferConfiguration());
            modelBuilder.Configurations.Add(new ChatGptPromptConfiguration());
            modelBuilder.Configurations.Add(new ChatGptPromptLogConfiguration());
            modelBuilder.Configurations.Add(new ChatGptPromptResultConfiguration());
            modelBuilder.Configurations.Add(new ChatGptPromptToneVoiceConfiguration());
            modelBuilder.Configurations.Add(new ChatGptRolConfiguration());
            modelBuilder.Configurations.Add(new ClientConfiguration());
            modelBuilder.Configurations.Add(new ClientBusinessOfferConfiguration());
            modelBuilder.Configurations.Add(new ClientCompanyConfiguration());
            modelBuilder.Configurations.Add(new ControlTypeConfiguration());
            modelBuilder.Configurations.Add(new LanguageConfiguration());
            modelBuilder.Configurations.Add(new SeoCampaignConfiguration());
            modelBuilder.Configurations.Add(new SeoTagConfiguration());
            modelBuilder.Configurations.Add(new SeoTagGroupConfiguration());
            modelBuilder.Configurations.Add(new SeoTagGroupTypeConfiguration());
            modelBuilder.Configurations.Add(new SeoToneVoiceConfiguration());
            modelBuilder.Configurations.Add(new SiteMapConfiguration());
            modelBuilder.Configurations.Add(new SiteMapPoliciesConfiguration());
            modelBuilder.Configurations.Add(new TensesConfiguration());
        }

        public static System.Data.Entity.DbModelBuilder CreateModel(System.Data.Entity.DbModelBuilder modelBuilder, string schema)
        {
            modelBuilder.Configurations.Add(new AspNetRolesConfiguration(schema));
            modelBuilder.Configurations.Add(new AspNetUserClaimsConfiguration(schema));
            modelBuilder.Configurations.Add(new AspNetUserLoginsConfiguration(schema));
            modelBuilder.Configurations.Add(new AspNetUserRolesConfiguration(schema));
            modelBuilder.Configurations.Add(new AspNetUsersConfiguration(schema));
            modelBuilder.Configurations.Add(new BusinessActivityTypeConfiguration(schema));
            modelBuilder.Configurations.Add(new BusinessTypeOfferConfiguration(schema));
            modelBuilder.Configurations.Add(new ChatGptPromptConfiguration(schema));
            modelBuilder.Configurations.Add(new ChatGptPromptLogConfiguration(schema));
            modelBuilder.Configurations.Add(new ChatGptPromptResultConfiguration(schema));
            modelBuilder.Configurations.Add(new ChatGptPromptToneVoiceConfiguration(schema));
            modelBuilder.Configurations.Add(new ChatGptRolConfiguration(schema));
            modelBuilder.Configurations.Add(new ClientConfiguration(schema));
            modelBuilder.Configurations.Add(new ClientBusinessOfferConfiguration(schema));
            modelBuilder.Configurations.Add(new ClientCompanyConfiguration(schema));
            modelBuilder.Configurations.Add(new ControlTypeConfiguration(schema));
            modelBuilder.Configurations.Add(new LanguageConfiguration(schema));
            modelBuilder.Configurations.Add(new SeoCampaignConfiguration(schema));
            modelBuilder.Configurations.Add(new SeoTagConfiguration(schema));
            modelBuilder.Configurations.Add(new SeoTagGroupConfiguration(schema));
            modelBuilder.Configurations.Add(new SeoTagGroupTypeConfiguration(schema));
            modelBuilder.Configurations.Add(new SeoToneVoiceConfiguration(schema));
            modelBuilder.Configurations.Add(new SiteMapConfiguration(schema));
            modelBuilder.Configurations.Add(new SiteMapPoliciesConfiguration(schema));
            modelBuilder.Configurations.Add(new TensesConfiguration(schema));
            return modelBuilder;
        }

        // Stored Procedures
        public System.Collections.Generic.List<SpGetSiteMapPolicyReturnModel> SpGetSiteMapPolicy(string userId, string siteMapName)
        {
            int procResult;
            return SpGetSiteMapPolicy(userId, siteMapName, out procResult);
        }

        public System.Collections.Generic.List<SpGetSiteMapPolicyReturnModel> SpGetSiteMapPolicy(string userId, string siteMapName, out int procResult)
        {
            var userIdParam = new System.Data.SqlClient.SqlParameter { ParameterName = "@UserId", SqlDbType = System.Data.SqlDbType.NVarChar, Direction = System.Data.ParameterDirection.Input, Value = userId, Size = 128 };
            if (userIdParam.Value == null)
                userIdParam.Value = System.DBNull.Value;

            var siteMapNameParam = new System.Data.SqlClient.SqlParameter { ParameterName = "@SiteMapName", SqlDbType = System.Data.SqlDbType.VarChar, Direction = System.Data.ParameterDirection.Input, Value = siteMapName, Size = 50 };
            if (siteMapNameParam.Value == null)
                siteMapNameParam.Value = System.DBNull.Value;

            var procResultParam = new System.Data.SqlClient.SqlParameter { ParameterName = "@procResult", SqlDbType = System.Data.SqlDbType.Int, Direction = System.Data.ParameterDirection.Output };
            var procResultData = Database.SqlQuery<SpGetSiteMapPolicyReturnModel>("EXEC @procResult = [dbo].[SP_GetSiteMapPolicy] @UserId, @SiteMapName", userIdParam, siteMapNameParam, procResultParam).ToList();

            procResult = (int) procResultParam.Value;
            return procResultData;
        }

        public async System.Threading.Tasks.Task<System.Collections.Generic.List<SpGetSiteMapPolicyReturnModel>> SpGetSiteMapPolicyAsync(string userId, string siteMapName)
        {
            var userIdParam = new System.Data.SqlClient.SqlParameter { ParameterName = "@UserId", SqlDbType = System.Data.SqlDbType.NVarChar, Direction = System.Data.ParameterDirection.Input, Value = userId, Size = 128 };
            if (userIdParam.Value == null)
                userIdParam.Value = System.DBNull.Value;

            var siteMapNameParam = new System.Data.SqlClient.SqlParameter { ParameterName = "@SiteMapName", SqlDbType = System.Data.SqlDbType.VarChar, Direction = System.Data.ParameterDirection.Input, Value = siteMapName, Size = 50 };
            if (siteMapNameParam.Value == null)
                siteMapNameParam.Value = System.DBNull.Value;

            var procResultData = await Database.SqlQuery<SpGetSiteMapPolicyReturnModel>("EXEC [dbo].[SP_GetSiteMapPolicy] @UserId, @SiteMapName", userIdParam, siteMapNameParam).ToListAsync();

            return procResultData;
        }

    }
}

