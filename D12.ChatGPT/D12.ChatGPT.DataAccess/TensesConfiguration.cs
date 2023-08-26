using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataAccess
{
    using D12.ChatGPT.DataModel;

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class TensesConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<Tenses>
    {
        public TensesConfiguration()
            : this("dbo")
        {
        }

        public TensesConfiguration(string schema)
        {
            Property(x => x.Tense).IsUnicode(false);
        }
    }

}

