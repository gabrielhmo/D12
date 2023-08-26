using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataAccess
{
    using D12.ChatGPT.DataModel;

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class SiteMapConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<SiteMap>
    {
        public SiteMapConfiguration()
            : this("dbo")
        {
        }

        public SiteMapConfiguration(string schema)
        {
            Property(x => x.Name).IsUnicode(false);
            Property(x => x.UrlPath).IsOptional().IsUnicode(false);
            Property(x => x.OnClick).IsOptional().IsUnicode(false);
        }
    }

}

