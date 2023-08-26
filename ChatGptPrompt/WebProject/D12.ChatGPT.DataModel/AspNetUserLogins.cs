using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("AspNetUserLogins", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class AspNetUserLogins
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column(@"LoginProvider", Order = 1, TypeName = "nvarchar")]
        [Index(@"PK_dbo.AspNetUserLogins", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [MaxLength(128)]
        [StringLength(128)]
        [Key]
        [Display(Name = "Login provider")]
        public string LoginProvider { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column(@"ProviderKey", Order = 2, TypeName = "nvarchar")]
        [Index(@"PK_dbo.AspNetUserLogins", 2, IsUnique = true, IsClustered = true)]
        [Required]
        [MaxLength(128)]
        [StringLength(128)]
        [Key]
        [Display(Name = "Provider key")]
        public string ProviderKey { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column(@"UserId", Order = 3, TypeName = "nvarchar")]
        [Index(@"PK_dbo.AspNetUserLogins", 3, IsUnique = true, IsClustered = true)]
        [Required]
        [MaxLength(128)]
        [StringLength(128)]
        [Key]
        [Display(Name = "User ID")]
        public string UserId { get; set; }


        [ForeignKey("UserId")] public virtual AspNetUsers AspNetUsers { get; set; }
    }

}

