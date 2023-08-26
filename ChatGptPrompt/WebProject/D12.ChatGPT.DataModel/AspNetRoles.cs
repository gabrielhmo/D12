using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("AspNetRoles", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class AspNetRoles
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column(@"Id", Order = 1, TypeName = "nvarchar")]
        [Index(@"PK_dbo.AspNetRoles", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [MaxLength(128)]
        [StringLength(128)]
        [Key]
        [Display(Name = "Id")]
        public string Id { get; set; }

        [Column(@"Name", Order = 2, TypeName = "nvarchar")]
        [Required]
        [MaxLength(256)]
        [StringLength(256)]
        [Display(Name = "Name")]
        public string Name { get; set; }

        public virtual System.Collections.Generic.ICollection<AspNetUserRoles> AspNetUserRoles { get; set; }
        public virtual System.Collections.Generic.ICollection<SiteMapPolicies> SiteMapPolicies { get; set; }

        public AspNetRoles()
        {
            Id = System.Guid.NewGuid().ToString();
            AspNetUserRoles = new System.Collections.Generic.List<AspNetUserRoles>();
            SiteMapPolicies = new System.Collections.Generic.List<SiteMapPolicies>();
        }
    }

}

