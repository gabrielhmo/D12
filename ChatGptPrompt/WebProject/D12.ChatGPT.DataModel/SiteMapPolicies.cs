using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("SiteMapPolicies", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class SiteMapPolicies
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "smallint")]
        [Index(@"PK_SiteMapPolicies", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [Key]
        [Display(Name = "Id")]
        public short Id { get; set; }

        [Column(@"RolId", Order = 2, TypeName = "nvarchar")]
        [Required]
        [MaxLength(128)]
        [StringLength(128)]
        [Display(Name = "Rol ID")]
        public string RolId { get; set; }

        [Column(@"SiteMapId", Order = 3, TypeName = "smallint")]
        [Required]
        [Display(Name = "Site map ID")]
        public short SiteMapId { get; set; }

        [Column(@"Read", Order = 4, TypeName = "bit")]
        [Required]
        [Display(Name = "Read")]
        public bool Read { get; set; }

        [Column(@"Write", Order = 5, TypeName = "bit")]
        [Required]
        [Display(Name = "Write")]
        public bool Write { get; set; }


        [ForeignKey("RolId")] public virtual AspNetRoles AspNetRoles { get; set; }

        [ForeignKey("SiteMapId")] public virtual SiteMap SiteMap { get; set; }

        public SiteMapPolicies()
        {
            Read = false;
            Write = false;
        }
    }

}

