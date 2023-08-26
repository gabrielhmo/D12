namespace D12.ChatGPT.DataModel
{

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class SiteMapPolicies
    {
        public short Id { get; set; }
        public string RolId { get; set; }
        public short SiteMapId { get; set; }
        public bool Read { get; set; }
        public bool Write { get; set; }


        public virtual AspNetRoles AspNetRoles { get; set; }

        public virtual SiteMap SiteMap { get; set; }

        public SiteMapPolicies()
        {
            Read = false;
            Write = false;
        }
    }

}

