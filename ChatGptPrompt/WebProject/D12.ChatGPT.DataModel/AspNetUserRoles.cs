using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("AspNetUserRoles", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class AspNetUserRoles
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "int")]
        [Index(@"PK_dbo.AspNetUserRoles", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column(@"UserId", Order = 2, TypeName = "nvarchar")]
        [Required]
        [MaxLength(128)]
        [StringLength(128)]
        [Display(Name = "User ID")]
        public string UserId { get; set; }

        [Column(@"RoleId", Order = 3, TypeName = "nvarchar")]
        [Required]
        [MaxLength(128)]
        [StringLength(128)]
        [Display(Name = "Role ID")]
        public string RoleId { get; set; }


        [ForeignKey("RoleId")] public virtual AspNetRoles AspNetRoles { get; set; }

        [ForeignKey("UserId")] public virtual AspNetUsers AspNetUsers { get; set; }
    }

}

