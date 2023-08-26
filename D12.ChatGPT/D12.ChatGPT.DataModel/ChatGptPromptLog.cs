namespace D12.ChatGPT.DataModel
{

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ChatGptPromptLog
    {
        public long Id { get; set; }
        public long PromptId { get; set; }
        public string Object { get; set; }
        public System.DateTime Created { get; set; }
        public string Model { get; set; }
        public int PromptTokens { get; set; }
        public int CompletionTokens { get; set; }
        public int TotalTokens { get; set; }
        public string FinishReason { get; set; }
        public int Index { get; set; }
        public System.DateTime EntryDate { get; set; }


        public virtual ChatGptPrompt ChatGptPrompt { get; set; }

        public ChatGptPromptLog()
        {
            PromptTokens = 0;
            CompletionTokens = 0;
            TotalTokens = 0;
            Index = 0;
            EntryDate = System.DateTime.Now;
        }
    }

}

