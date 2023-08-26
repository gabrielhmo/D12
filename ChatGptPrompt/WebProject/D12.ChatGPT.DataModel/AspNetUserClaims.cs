using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("AspNetUserClaims", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class AspNetUserClaims
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "int")]
        [Index(@"PK_dbo.AspNetUserClaims", 1, IsUnique = true, IsClustered = true)]
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

        [Column(@"ClaimType", Order = 3, TypeName = "nvarchar(max)")]
        [Display(Name = "Claim type")]
        public string ClaimType { get; set; }

        [Column(@"ClaimValue", Order = 4, TypeName = "nvarchar(max)")]
        [Display(Name = "Claim value")]
        public string ClaimValue { get; set; }


        [ForeignKey("UserId")] public virtual AspNetUsers AspNetUsers { get; set; }
    }

}

