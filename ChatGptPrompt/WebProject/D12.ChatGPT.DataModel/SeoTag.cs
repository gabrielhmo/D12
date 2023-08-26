using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("SEO_Tag", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class SeoTag
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "bigint")]
        [Index(@"PK_SEO_Tag", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [Key]
        [Display(Name = "Id")]
        public long Id { get; set; }

        [Column(@"TagGroupId", Order = 2, TypeName = "int")]
        [Required]
        [Display(Name = "Tag group ID")]
        public int TagGroupId { get; set; }

        [Column(@"Name", Order = 3, TypeName = "varchar")]
        [Required]
        [MaxLength(80)]
        [StringLength(80)]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Column(@"Active", Order = 4, TypeName = "bit")]
        [Required]
        [Display(Name = "Active")]
        public bool Active { get; set; }


        [ForeignKey("TagGroupId")] public virtual SeoTagGroup SeoTagGroup { get; set; }

        public SeoTag()
        {
            Active = true;
        }
    }

}

