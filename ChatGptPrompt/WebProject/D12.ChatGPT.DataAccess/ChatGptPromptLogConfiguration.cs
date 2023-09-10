using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataAccess
{
    using D12.ChatGPT.DataModel;

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ChatGptPromptLogConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<ChatGptPromptLog>
    {
        public ChatGptPromptLogConfiguration()
            : this("dbo")
        {
        }

        public ChatGptPromptLogConfiguration(string schema)
        {
            Property(x => x.Message).IsUnicode(false);
            Property(x => x.Type).IsOptional().IsUnicode(false);
            Property(x => x.Code).IsOptional().IsUnicode(false);
            Property(x => x.Param).IsOptional().IsUnicode(false);

        }
    }

}

