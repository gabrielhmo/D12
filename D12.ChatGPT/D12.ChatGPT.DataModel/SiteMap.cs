namespace D12.ChatGPT.DataModel
{

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class SiteMap
    {
        public short Id { get; set; }
        public short ParentId { get; set; }
        public string Name { get; set; }
        public short Index { get; set; }
        public string UrlPath { get; set; }
        public bool NewWindows { get; set; }
        public string OnClick { get; set; }
        public bool IsPublic { get; set; }
        public bool Active { get; set; }
        public bool Deleted { get; set; }

        public virtual System.Collections.Generic.ICollection<SiteMapPolicies> SiteMapPolicies { get; set; }

        public SiteMap()
        {
            NewWindows = false;
            IsPublic = false;
            Active = true;
            Deleted = false;
            SiteMapPolicies = new System.Collections.Generic.List<SiteMapPolicies>();
        }
    }

}

