using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("ChatGPTContextToneVoice", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ChatGptContextToneVoice
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "int")]
        [Index(@"PK_ChatGPTContextToneVoice", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column(@"ContextId", Order = 2, TypeName = "bigint")]
        [Required]
        [Display(Name = "Context ID")]
        public long ContextId { get; set; }

        [Column(@"ToneVoiceId", Order = 3, TypeName = "smallint")]
        [Required]
        [Display(Name = "Tone voice ID")]
        public short ToneVoiceId { get; set; }


        [ForeignKey("ContextId")] public virtual ChatGptContext ChatGptContext { get; set; }

        [ForeignKey("ToneVoiceId")] public virtual SeoToneVoice SeoToneVoice { get; set; }
    }

}

