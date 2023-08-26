using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataAccess
{
    using D12.ChatGPT.DataModel;

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ControlTypeConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<ControlType>
    {
        public ControlTypeConfiguration()
            : this("dbo")
        {
        }

        public ControlTypeConfiguration(string schema)
        {
            Property(x => x.Label).IsOptional().IsUnicode(false);
            Property(x => x.Type).IsUnicode(false);
        }
    }

}

