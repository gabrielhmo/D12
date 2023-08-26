namespace D12.ChatGPT.DataModel
{

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ChatGptContext
    {
        public long Id { get; set; }
        public long SeoCampaignId { get; set; }
        public int ChatGptRolId { get; set; }
        public int ControlTypeId { get; set; }
        public string LanguageCode { get; set; }
        public int? TenseId { get; set; }
        public int MinWord { get; set; }
        public int? MaxWord { get; set; }
        public string Context { get; set; }
        public bool Active { get; set; }

        public virtual System.Collections.Generic.ICollection<ChatGptPrompt> ChatGptPrompt { get; set; }


        public virtual ChatGptRol ChatGptRol { get; set; }

        public virtual ControlType ControlType { get; set; }

        public virtual Language Language { get; set; }

        public virtual SeoCampaign SeoCampaign { get; set; }

        public virtual Tenses Tenses { get; set; }

        public ChatGptContext()
        {
            ChatGptRolId = 2;
            LanguageCode = "ENG";
            MinWord = 1;
            Active = true;
            ChatGptPrompt = new System.Collections.Generic.List<ChatGptPrompt>();
        }
    }

}

