using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("Language", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class Language
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column(@"Code", Order = 1, TypeName = "char")]
        [Index(@"PK_Language", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [MaxLength(3)]
        [StringLength(3)]
        [Key]
        [Display(Name = "Code")]
        public string Code { get; set; }

        [Column(@"Label", Order = 2, TypeName = "varchar")]
        [Index(@"UK_Language_Label", 1, IsUnique = true, IsClustered = false)]
        [Required]
        [MaxLength(30)]
        [StringLength(30)]
        [Display(Name = "Label")]
        public string Label { get; set; }

        [Column(@"Active", Order = 3, TypeName = "bit")]
        [Required]
        [Display(Name = "Active")]
        public bool Active { get; set; }

        public virtual System.Collections.Generic.ICollection<ChatGptPrompt> ChatGptPrompt { get; set; }

        public Language()
        {
            Active = true;
            ChatGptPrompt = new System.Collections.Generic.List<ChatGptPrompt>();
        }
    }

}

