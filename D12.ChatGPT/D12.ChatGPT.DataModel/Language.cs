using System.ComponentModel.DataAnnotations;

namespace D12.ChatGPT.DataModel
{

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class Language
    {
        [Key]
        public string Code { get; set; }
        public string Label { get; set; }
        public bool Active { get; set; }

        public virtual System.Collections.Generic.ICollection<ChatGptContext> ChatGptContext { get; set; }

        public Language()
        {
            Active = true;
            ChatGptContext = new System.Collections.Generic.List<ChatGptContext>();
        }
    }

}

