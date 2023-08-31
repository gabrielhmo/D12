using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("ChatGPTPromptResult", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ChatGptPromptResult
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "bigint")]
        [Index(@"PK_ChatGPTPromptResult", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [Key]
        [Display(Name = "Id")]
        public long Id { get; set; }

        [Column(@"PromptId", Order = 2, TypeName = "bigint")]
        [Required]
        [Display(Name = "Prompt ID")]
        public long PromptId { get; set; }

        [Column(@"Response", Order = 3, TypeName = "varchar(max)")]
        [Required]
        [Display(Name = "Response")]
        public string Response { get; set; }

        [Column(@"DateRequest", Order = 4, TypeName = "smalldatetime")]
        [Display(Name = "Date request")]
        public System.DateTime? DateRequest { get; set; }

        [Column(@"Active", Order = 5, TypeName = "bit")]
        [Display(Name = "Active")]
        public bool? Active { get; set; }

        [Column(@"EntryDate", Order = 6, TypeName = "smalldatetime")]
        [Display(Name = "Entry date")]
        public System.DateTime? EntryDate { get; set; }

        public virtual System.Collections.Generic.ICollection<ChatGptPromptLog> ChatGptPromptLog { get; set; }


        [ForeignKey("PromptId")] public virtual ChatGptPrompt ChatGptPrompt { get; set; }

        public ChatGptPromptResult()
        {
            Active = false;
            ChatGptPromptLog = new System.Collections.Generic.List<ChatGptPromptLog>();
        }
    }

}

