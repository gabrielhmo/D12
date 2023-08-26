using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("SEO_TagGroupType", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class SeoTagGroupType
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "int")]
        [Index(@"PK_SEO_TagGroupType", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column(@"Label", Order = 2, TypeName = "varchar")]
        [Required]
        [MaxLength(80)]
        [StringLength(80)]
        [Display(Name = "Label")]
        public string Label { get; set; }

        [Column(@"Active", Order = 3, TypeName = "bit")]
        [Required]
        [Display(Name = "Active")]
        public bool Active { get; set; }

        public virtual System.Collections.Generic.ICollection<SeoTagGroup> SeoTagGroup { get; set; }

        public SeoTagGroupType()
        {
            Active = true;
            SeoTagGroup = new System.Collections.Generic.List<SeoTagGroup>();
        }
    }

}

