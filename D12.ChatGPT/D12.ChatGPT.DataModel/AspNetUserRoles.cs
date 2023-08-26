namespace D12.ChatGPT.DataModel
{

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class AspNetUserRoles
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string RoleId { get; set; }


        public virtual AspNetRoles AspNetRoles { get; set; }

        public virtual AspNetUsers AspNetUsers { get; set; }
    }

}

