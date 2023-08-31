using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("ChatGPTPromptToneVoice", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ChatGptPromptToneVoice
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "int")]
        [Index(@"PK_ChatGPTPromptToneVoice", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column(@"PromptId", Order = 2, TypeName = "bigint")]
        [Required]
        [Display(Name = "Prompt ID")]
        public long PromptId { get; set; }

        [Column(@"ToneVoiceId", Order = 3, TypeName = "smallint")]
        [Required]
        [Display(Name = "Tone voice ID")]
        public short ToneVoiceId { get; set; }


        [ForeignKey("PromptId")] public virtual ChatGptPrompt ChatGptPrompt { get; set; }

        [ForeignKey("ToneVoiceId")] public virtual SeoToneVoice SeoToneVoice { get; set; }
    }

}

