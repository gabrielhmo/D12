namespace D12.ChatGPT.DataModel
{

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ChatGptPrompt
    {
        public long Id { get; set; }
        public long ContextId { get; set; }
        public string Prompt { get; set; }
        public bool Sent { get; set; }
        public System.DateTime? SentDate { get; set; }

        public virtual System.Collections.Generic.ICollection<ChatGptPromptLog> ChatGptPromptLog { get; set; }
        public virtual System.Collections.Generic.ICollection<ChatGptPromptResult> ChatGptPromptResult { get; set; }


        public virtual ChatGptContext ChatGptContext { get; set; }

        public ChatGptPrompt()
        {
            Sent = false;
            ChatGptPromptResult = new System.Collections.Generic.List<ChatGptPromptResult>();
            ChatGptPromptLog = new System.Collections.Generic.List<ChatGptPromptLog>();
        }
    }

}

