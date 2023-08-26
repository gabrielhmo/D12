using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataAccess
{
    using D12.ChatGPT.DataModel;

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ChatGptContextConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<ChatGptContext>
    {
        public ChatGptContextConfiguration()
            : this("dbo")
        {
        }

        public ChatGptContextConfiguration(string schema)
        {
            Property(x => x.LanguageCode).IsFixedLength().IsUnicode(false);
            Property(x => x.TenseId).IsOptional();
            Property(x => x.Name).IsUnicode(false);
            Property(x => x.Context).IsUnicode(false);
            Property(x => x.MinLength).IsOptional();
            Property(x => x.MaxLength).IsOptional();
            Property(x => x.MinWord).IsOptional();
            Property(x => x.MaxWord).IsOptional();

        }
    }

}

