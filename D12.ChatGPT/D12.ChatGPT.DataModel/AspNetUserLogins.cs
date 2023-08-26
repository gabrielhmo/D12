using System.ComponentModel.DataAnnotations;

namespace D12.ChatGPT.DataModel
{

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class AspNetUserLogins
    {
        [Key]
        public string LoginProvider { get; set; }
        [Key]
        public string ProviderKey { get; set; }
        [Key]
        public string UserId { get; set; }


        public virtual AspNetUsers AspNetUsers { get; set; }
    }

}

