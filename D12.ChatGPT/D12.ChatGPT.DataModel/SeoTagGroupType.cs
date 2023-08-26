namespace D12.ChatGPT.DataModel
{

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class SeoTagGroupType
    {
        public int Id { get; set; }
        public string Label { get; set; }
        public bool Active { get; set; }

        public virtual System.Collections.Generic.ICollection<SeoTagGroup> SeoTagGroup { get; set; }

        public SeoTagGroupType()
        {
            Active = true;
            SeoTagGroup = new System.Collections.Generic.List<SeoTagGroup>();
        }
    }

}

