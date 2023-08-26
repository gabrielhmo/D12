namespace D12.ChatGPT.DataModel
{

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class SeoTagGroup
    {
        public int Id { get; set; }
        public int GroupTypeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
        public System.DateTime EntryDate { get; set; }

        public virtual System.Collections.Generic.ICollection<SeoTag> SeoTag { get; set; }


        public virtual SeoTagGroupType SeoTagGroupType { get; set; }

        public SeoTagGroup()
        {
            Active = true;
            EntryDate = System.DateTime.Now;
            SeoTag = new System.Collections.Generic.List<SeoTag>();
        }
    }

}

