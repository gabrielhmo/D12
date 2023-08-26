using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataAccess
{
    using D12.ChatGPT.DataModel;

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ClientCompanyConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<ClientCompany>
    {
        public ClientCompanyConfiguration()
            : this("dbo")
        {
        }

        public ClientCompanyConfiguration(string schema)
        {
            Property(x => x.Name).IsUnicode(false);
            Property(x => x.Industry).IsOptional().IsUnicode(false);
            Property(x => x.Activity).IsOptional().IsUnicode(false);

        }
    }

}

