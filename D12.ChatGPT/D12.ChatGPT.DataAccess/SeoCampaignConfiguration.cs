using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataAccess
{
    using D12.ChatGPT.DataModel;

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class SeoCampaignConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<SeoCampaign>
    {
        public SeoCampaignConfiguration()
            : this("dbo")
        {
        }

        public SeoCampaignConfiguration(string schema)
        {
            Property(x => x.Name).IsUnicode(false);
            Property(x => x.Description).IsOptional().IsUnicode(false);
            Property(x => x.Market).IsOptional().IsUnicode(false);
            Property(x => x.PrimaryKeyword).IsOptional().IsUnicode(false);
            Property(x => x.Keywords).IsOptional().IsUnicode(false);

        }
    }

}

