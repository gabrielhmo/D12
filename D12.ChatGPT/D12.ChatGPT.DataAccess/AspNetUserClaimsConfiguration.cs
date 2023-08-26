using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataAccess
{
    using D12.ChatGPT.DataModel;

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class AspNetUserClaimsConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<AspNetUserClaims>
    {
        public AspNetUserClaimsConfiguration()
            : this("dbo")
        {
        }

        public AspNetUserClaimsConfiguration(string schema)
        {
            Property(x => x.ClaimType).IsOptional();
            Property(x => x.ClaimValue).IsOptional();

        }
    }

}

