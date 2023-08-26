using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataAccess
{
    using D12.ChatGPT.DataModel;

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class AspNetUsersConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<AspNetUsers>
    {
        public AspNetUsersConfiguration()
            : this("dbo")
        {
        }

        public AspNetUsersConfiguration(string schema)
        {
            Property(x => x.FirstName).IsOptional().IsUnicode(false);
            Property(x => x.LastName).IsOptional().IsUnicode(false);
            Property(x => x.JobTitle).IsOptional().IsUnicode(false);
            Property(x => x.LastAccess).IsOptional();
            Property(x => x.Email).IsOptional().IsUnicode(false);
            Property(x => x.PasswordHash).IsOptional();
            Property(x => x.SecurityStamp).IsOptional();
            Property(x => x.PhoneNumber).IsOptional();
            Property(x => x.LockoutEndDateUtc).IsOptional();
            Property(x => x.UserName).IsUnicode(false);

        }
    }

}

