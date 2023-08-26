namespace D12.ChatGPT.DataModel
{

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class SeoCampaign
    {
        public long Id { get; set; }
        public int BusinessOfferId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Market { get; set; }
        public string PrimaryKeyword { get; set; }
        public string Keywords { get; set; }
        public bool Active { get; set; }
        public System.DateTime EntryDate { get; set; }

        public virtual System.Collections.Generic.ICollection<ChatGptContext> ChatGptContext { get; set; }


        public virtual ClientBusinessOffer ClientBusinessOffer { get; set; }

        public SeoCampaign()
        {
            Active = true;
            EntryDate = System.DateTime.Now;
            ChatGptContext = new System.Collections.Generic.List<ChatGptContext>();
        }
    }

}

