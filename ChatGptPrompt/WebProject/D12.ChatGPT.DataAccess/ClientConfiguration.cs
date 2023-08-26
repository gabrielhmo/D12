using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataAccess
{
    using D12.ChatGPT.DataModel;

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ClientConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<Client>
    {
        public ClientConfiguration()
            : this("dbo")
        {
        }

        public ClientConfiguration(string schema)
        {
            Property(x => x.Name).IsUnicode(false);
            Property(x => x.Email).IsUnicode(false);
        }
    }

}

