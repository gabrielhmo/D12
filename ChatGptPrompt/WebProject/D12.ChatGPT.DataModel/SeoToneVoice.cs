using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("SEO_ToneVoice", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class SeoToneVoice
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "smallint")]
        [Index(@"PK_SEO_ToneVoice", 1, IsUnique = true, IsClustered = true)]
        [Index(@"UK_SEO_ToneVoice_Tone", 1, IsUnique = true, IsClustered = false)]
        [Required]
        [Key]
        [Display(Name = "Id")]
        public short Id { get; set; }

        [Column(@"Tone", Order = 2, TypeName = "varchar")]
        [Required]
        [MaxLength(80)]
        [StringLength(80)]
        [Display(Name = "Tone")]
        public string Tone { get; set; }

        [Column(@"Active", Order = 3, TypeName = "bit")]
        [Required]
        [Display(Name = "Active")]
        public bool Active { get; set; }

        public virtual System.Collections.Generic.ICollection<ChatGptPromptToneVoice> ChatGptPromptToneVoice { get; set; }

        public SeoToneVoice()
        {
            Active = true;
            ChatGptPromptToneVoice = new System.Collections.Generic.List<ChatGptPromptToneVoice>();
        }
    }

}

