using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataAccess
{
    using D12.ChatGPT.DataModel;

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ChatGptRolConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<ChatGptRol>
    {
        public ChatGptRolConfiguration()
            : this("dbo")
        {
        }

        public ChatGptRolConfiguration(string schema)
        {
            Property(x => x.Name).IsUnicode(false);
        }
    }

}

