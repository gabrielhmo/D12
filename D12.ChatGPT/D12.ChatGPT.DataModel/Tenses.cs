namespace D12.ChatGPT.DataModel
{

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class Tenses
    {
        public int Id { get; set; }
        public string Tense { get; set; }
        public bool Active { get; set; }

        public virtual System.Collections.Generic.ICollection<ChatGptContext> ChatGptContext { get; set; }

        public Tenses()
        {
            Tense = "1";
            Active = true;
            ChatGptContext = new System.Collections.Generic.List<ChatGptContext>();
        }
    }

}

