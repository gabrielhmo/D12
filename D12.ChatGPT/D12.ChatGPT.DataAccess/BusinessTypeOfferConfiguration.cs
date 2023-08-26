using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataAccess
{
    using D12.ChatGPT.DataModel;

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class BusinessTypeOfferConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<BusinessTypeOffer>
    {
        public BusinessTypeOfferConfiguration()
            : this("dbo")
        {
        }

        public BusinessTypeOfferConfiguration(string schema)
        {
            Property(x => x.Name).IsUnicode(false);
        }
    }

}

