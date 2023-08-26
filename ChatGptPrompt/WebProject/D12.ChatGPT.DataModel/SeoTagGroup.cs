using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("SEO_TagGroup", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class SeoTagGroup
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "int")]
        [Index(@"PK_SEO_TagGroup", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column(@"GroupTypeId", Order = 2, TypeName = "int")]
        [Required]
        [Display(Name = "Group type ID")]
        public int GroupTypeId { get; set; }

        [Column(@"Name", Order = 3, TypeName = "varchar")]
        [Required]
        [MaxLength(80)]
        [StringLength(80)]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Column(@"Description", Order = 4, TypeName = "varchar")]
        [MaxLength(250)]
        [StringLength(250)]
        [Display(Name = "Description")]
        public string Description { get; set; }

        [Column(@"Active", Order = 5, TypeName = "bit")]
        [Required]
        [Display(Name = "Active")]
        public bool Active { get; set; }

        [Column(@"EntryDate", Order = 6, TypeName = "smalldatetime")]
        [Required]
        [Display(Name = "Entry date")]
        public System.DateTime EntryDate { get; set; }

        public virtual System.Collections.Generic.ICollection<SeoTag> SeoTag { get; set; }


        [ForeignKey("GroupTypeId")] public virtual SeoTagGroupType SeoTagGroupType { get; set; }

        public SeoTagGroup()
        {
            Active = true;
            EntryDate = System.DateTime.Now;
            SeoTag = new System.Collections.Generic.List<SeoTag>();
        }
    }

}

