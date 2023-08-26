using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataAccess
{
    using D12.ChatGPT.DataModel;

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class SeoTagGroupTypeConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<SeoTagGroupType>
    {
        public SeoTagGroupTypeConfiguration()
            : this("dbo")
        {
        }

        public SeoTagGroupTypeConfiguration(string schema)
        {
            Property(x => x.Label).IsUnicode(false);
        }
    }

}

