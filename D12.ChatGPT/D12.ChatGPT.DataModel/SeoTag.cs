namespace D12.ChatGPT.DataModel
{

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class SeoTag
    {
        public long Id { get; set; }
        public int TagGroupId { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }


        public virtual SeoTagGroup SeoTagGroup { get; set; }

        public SeoTag()
        {
            Active = true;
        }
    }

}

