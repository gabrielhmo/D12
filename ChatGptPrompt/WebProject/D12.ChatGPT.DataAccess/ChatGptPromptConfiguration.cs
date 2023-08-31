using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataAccess
{
    using D12.ChatGPT.DataModel;

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ChatGptPromptConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<ChatGptPrompt>
    {
        public ChatGptPromptConfiguration()
            : this("dbo")
        {
        }

        public ChatGptPromptConfiguration(string schema)
        {
            Property(x => x.LanguageCode).IsFixedLength().IsUnicode(false);
            Property(x => x.TenseId).IsOptional();
            Property(x => x.Name).IsUnicode(false);
            Property(x => x.Prompt).IsUnicode(false);
            Property(x => x.MinLength).IsOptional();
            Property(x => x.MaxLength).IsOptional();
            Property(x => x.MinWord).IsOptional();
            Property(x => x.MaxWord).IsOptional();
            Property(x => x.SentDate).IsOptional();

        }
    }

}

