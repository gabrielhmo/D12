using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("ControlType", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ControlType
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "int")]
        [Index(@"PK_ControlType", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column(@"Label", Order = 2, TypeName = "varchar")]
        [MaxLength(50)]
        [StringLength(50)]
        [Display(Name = "Label")]
        public string Label { get; set; }

        [Column(@"Type", Order = 3, TypeName = "varchar")]
        [Required]
        [MaxLength(50)]
        [StringLength(50)]
        [Display(Name = "Type")]
        public string Type { get; set; }

        [Column(@"Active", Order = 4, TypeName = "bit")]
        [Required]
        [Display(Name = "Active")]
        public bool Active { get; set; }

        public virtual System.Collections.Generic.ICollection<ChatGptContext> ChatGptContext { get; set; }

        public ControlType()
        {
            Active = true;
            ChatGptContext = new System.Collections.Generic.List<ChatGptContext>();
        }
    }

}

