namespace D12.ChatGPT.DataModel
{

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ChatGptPromptResult
    {
        public long Id { get; set; }
        public long PromptId { get; set; }
        public string Response { get; set; }
        public System.DateTime? DateRequest { get; set; }
        public System.DateTime? Active { get; set; }
        public System.DateTime? EntryDate { get; set; }


        public virtual ChatGptPrompt ChatGptPrompt { get; set; }
    }

}

