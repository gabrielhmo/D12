using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("ChatGPTPromptLog", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ChatGptPromptLog
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "bigint")]
        [Index(@"PK_ChatGPTPromptLog", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [Key]
        [Display(Name = "Id")]
        public long Id { get; set; }

        [Column(@"PromptId", Order = 2, TypeName = "bigint")]
        [Required]
        [Display(Name = "Prompt ID")]
        public long PromptId { get; set; }

        [Column(@"Object", Order = 3, TypeName = "varchar")]
        [Required]
        [MaxLength(100)]
        [StringLength(100)]
        [Display(Name = "Object")]
        public string Object { get; set; }

        [Column(@"Created", Order = 4, TypeName = "smalldatetime")]
        [Required]
        [Display(Name = "Created")]
        public System.DateTime Created { get; set; }

        [Column(@"Model", Order = 5, TypeName = "varchar")]
        [Required]
        [MaxLength(100)]
        [StringLength(100)]
        [Display(Name = "Model")]
        public string Model { get; set; }

        [Column(@"Prompt_Tokens", Order = 6, TypeName = "int")]
        [Required]
        [Display(Name = "Prompt tokens")]
        public int PromptTokens { get; set; }

        [Column(@"Completion_Tokens", Order = 7, TypeName = "int")]
        [Required]
        [Display(Name = "Completion tokens")]
        public int CompletionTokens { get; set; }

        [Column(@"Total_Tokens", Order = 8, TypeName = "int")]
        [Required]
        [Display(Name = "Total tokens")]
        public int TotalTokens { get; set; }

        [Column(@"Finish_Reason", Order = 9, TypeName = "varchar")]
        [Required]
        [MaxLength(50)]
        [StringLength(50)]
        [Display(Name = "Finish reason")]
        public string FinishReason { get; set; }

        [Column(@"Index", Order = 10, TypeName = "int")]
        [Required]
        [Display(Name = "Index")]
        public int Index { get; set; }

        [Column(@"EntryDate", Order = 11, TypeName = "smalldatetime")]
        [Required]
        [Display(Name = "Entry date")]
        public System.DateTime EntryDate { get; set; }


        [ForeignKey("PromptId")] public virtual ChatGptPrompt ChatGptPrompt { get; set; }

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

