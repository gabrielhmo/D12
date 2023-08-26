using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataAccess
{
    using D12.ChatGPT.DataModel;

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class SeoToneVoiceConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<SeoToneVoice>
    {
        public SeoToneVoiceConfiguration()
            : this("dbo")
        {
        }

        public SeoToneVoiceConfiguration(string schema)
        {
            Property(x => x.Tone).IsUnicode(false);
        }
    }

}

