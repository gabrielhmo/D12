using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("ChatGPTPrompt", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ChatGptPrompt
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "bigint")]
        [Index(@"PK_ChatGPTPrompt", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [Key]
        [Display(Name = "Id")]
        public long Id { get; set; }

        [Column(@"ContextId", Order = 2, TypeName = "bigint")]
        [Required]
        [Display(Name = "Context ID")]
        public long ContextId { get; set; }

        [Column(@"Prompt", Order = 3, TypeName = "varchar(max)")]
        [Required]
        [Display(Name = "Prompt")]
        public string Prompt { get; set; }

        [Column(@"Sent", Order = 4, TypeName = "bit")]
        [Required]
        [Display(Name = "Sent")]
        public bool Sent { get; set; }

        [Column(@"SentDate", Order = 5, TypeName = "smalldatetime")]
        [Display(Name = "Sent date")]
        public System.DateTime? SentDate { get; set; }

        public virtual System.Collections.Generic.ICollection<ChatGptPromptLog> ChatGptPromptLog { get; set; }
        public virtual System.Collections.Generic.ICollection<ChatGptPromptResult> ChatGptPromptResult { get; set; }


        [ForeignKey("ContextId")] public virtual ChatGptContext ChatGptContext { get; set; }

        public ChatGptPrompt()
        {
            Sent = false;
            ChatGptPromptResult = new System.Collections.Generic.List<ChatGptPromptResult>();
            ChatGptPromptLog = new System.Collections.Generic.List<ChatGptPromptLog>();
        }
    }

}

