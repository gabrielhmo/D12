namespace D12.ChatGPT.DataModel
{

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class AspNetRoles
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public virtual System.Collections.Generic.ICollection<AspNetUserRoles> AspNetUserRoles { get; set; }
        public virtual System.Collections.Generic.ICollection<SiteMapPolicies> SiteMapPolicies { get; set; }

        public AspNetRoles()
        {
            Id = System.Guid.NewGuid().ToString();
            AspNetUserRoles = new System.Collections.Generic.List<AspNetUserRoles>();
            SiteMapPolicies = new System.Collections.Generic.List<SiteMapPolicies>();
        }
    }

}

