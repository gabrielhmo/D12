using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataAccess
{
    using D12.ChatGPT.DataModel;

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class LanguageConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<Language>
    {
        public LanguageConfiguration()
            : this("dbo")
        {
        }

        public LanguageConfiguration(string schema)
        {
            Property(x => x.Code).IsFixedLength().IsUnicode(false);
            Property(x => x.Label).IsUnicode(false);
        }
    }

}

