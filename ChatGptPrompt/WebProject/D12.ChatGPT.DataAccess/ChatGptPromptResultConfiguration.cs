using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataAccess
{
    using D12.ChatGPT.DataModel;

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ChatGptPromptResultConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<ChatGptPromptResult>
    {
        public ChatGptPromptResultConfiguration()
            : this("dbo")
        {
        }

        public ChatGptPromptResultConfiguration(string schema)
        {
            Property(x => x.Response).IsUnicode(false);
            Property(x => x.DateRequest).IsOptional();
            Property(x => x.Active).IsOptional();
            Property(x => x.EntryDate).IsOptional();

        }
    }

}

