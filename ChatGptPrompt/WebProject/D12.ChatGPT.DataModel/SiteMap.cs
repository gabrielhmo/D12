using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("SiteMap", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class SiteMap
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "smallint")]
        [Index(@"PK_SiteMap", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [Key]
        [Display(Name = "Id")]
        public short Id { get; set; }

        [Column(@"ParentId", Order = 2, TypeName = "smallint")]
        [Required]
        [Display(Name = "Parent ID")]
        public short ParentId { get; set; }

        [Column(@"Name", Order = 3, TypeName = "varchar")]
        [Index(@"UK_SiteMap_Name", 1, IsUnique = true, IsClustered = false)]
        [Required]
        [MaxLength(50)]
        [StringLength(50)]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Column(@"Index", Order = 4, TypeName = "smallint")]
        [Required]
        [Display(Name = "Index")]
        public short Index { get; set; }

        [Column(@"UrlPath", Order = 5, TypeName = "varchar")]
        [MaxLength(2048)]
        [StringLength(2048)]
        [Display(Name = "Url path")]
        public string UrlPath { get; set; }

        [Column(@"NewWindows", Order = 6, TypeName = "bit")]
        [Required]
        [Display(Name = "New windows")]
        public bool NewWindows { get; set; }

        [Column(@"OnClick", Order = 7, TypeName = "varchar")]
        [MaxLength(80)]
        [StringLength(80)]
        [Display(Name = "On click")]
        public string OnClick { get; set; }

        [Column(@"IsPublic", Order = 8, TypeName = "bit")]
        [Required]
        [Display(Name = "Is public")]
        public bool IsPublic { get; set; }

        [Column(@"Active", Order = 9, TypeName = "bit")]
        [Required]
        [Display(Name = "Active")]
        public bool Active { get; set; }

        [Column(@"Deleted", Order = 10, TypeName = "bit")]
        [Required]
        [Display(Name = "Deleted")]
        public bool Deleted { get; set; }

        public virtual System.Collections.Generic.ICollection<SiteMapPolicies> SiteMapPolicies { get; set; }

        public SiteMap()
        {
            NewWindows = false;
            IsPublic = false;
            Active = true;
            Deleted = false;
            SiteMapPolicies = new System.Collections.Generic.List<SiteMapPolicies>();
        }
    }

}

