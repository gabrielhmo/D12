using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("AspNetUsers", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class AspNetUsers
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column(@"Id", Order = 1, TypeName = "nvarchar")]
        [Index(@"PK_dbo.AspNetUsers", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [MaxLength(128)]
        [StringLength(128)]
        [Key]
        [Display(Name = "Id")]
        [ForeignKey("AspNetUsers_Id")]
        public string Id { get; set; }

        [Column(@"FirstName", Order = 2, TypeName = "varchar")]
        [Index(@"UK_AspNetUsers_FullName", 1, IsUnique = true, IsClustered = false)]
        [MaxLength(30)]
        [StringLength(30)]
        [Display(Name = "First name")]
        public string FirstName { get; set; }

        [Column(@"LastName", Order = 3, TypeName = "varchar")]
        [Index(@"UK_AspNetUsers_FullName", 2, IsUnique = true, IsClustered = false)]
        [MaxLength(30)]
        [StringLength(30)]
        [Display(Name = "Last name")]
        public string LastName { get; set; }

        [Column(@"JobTitle", Order = 4, TypeName = "varchar")]
        [MaxLength(30)]
        [StringLength(30)]
        [Display(Name = "Job title")]
        public string JobTitle { get; set; }

        [Column(@"LastAccess", Order = 5, TypeName = "smalldatetime")]
        [Display(Name = "Last access")]
        public System.DateTime? LastAccess { get; set; }

        [Column(@"EntryDate", Order = 6, TypeName = "smalldatetime")]
        [Required]
        [Display(Name = "Entry date")]
        public System.DateTime EntryDate { get; set; }

        [Column(@"Email", Order = 7, TypeName = "varchar")]
        [MaxLength(120)]
        [StringLength(120)]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Column(@"EmailConfirmed", Order = 8, TypeName = "bit")]
        [Required]
        [Display(Name = "Email confirmed")]
        public bool EmailConfirmed { get; set; }

        [Column(@"PasswordHash", Order = 9, TypeName = "nvarchar(max)")]
        [Display(Name = "Password hash")]
        public string PasswordHash { get; set; }

        [Column(@"SecurityStamp", Order = 10, TypeName = "nvarchar(max)")]
        [Display(Name = "Security stamp")]
        public string SecurityStamp { get; set; }

        [Column(@"PhoneNumber", Order = 11, TypeName = "nvarchar(max)")]
        [Phone]
        [Display(Name = "Phone number")]
        public string PhoneNumber { get; set; }

        [Column(@"PhoneNumberConfirmed", Order = 12, TypeName = "bit")]
        [Required]
        [Display(Name = "Phone number confirmed")]
        public bool PhoneNumberConfirmed { get; set; }

        [Column(@"TwoFactorEnabled", Order = 13, TypeName = "bit")]
        [Required]
        [Display(Name = "Two factor enabled")]
        public bool TwoFactorEnabled { get; set; }

        [Column(@"LockoutEndDateUtc", Order = 14, TypeName = "datetime")]
        [Display(Name = "Lockout end date utc")]
        public System.DateTime? LockoutEndDateUtc { get; set; }

        [Column(@"LockoutEnabled", Order = 15, TypeName = "bit")]
        [Required]
        [Display(Name = "Lockout enabled")]
        public bool LockoutEnabled { get; set; }

        [Column(@"AccessFailedCount", Order = 16, TypeName = "int")]
        [Required]
        [Display(Name = "Access failed count")]
        public int AccessFailedCount { get; set; }

        [Column(@"UserName", Order = 17, TypeName = "varchar")]
        [Required]
        [MaxLength(15)]
        [StringLength(15)]
        [DataType(DataType.Text)]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Column(@"Active", Order = 18, TypeName = "bit")]
        [Required]
        [Display(Name = "Active")]
        public bool Active { get; set; }

        [Column(@"ReadOnly", Order = 19, TypeName = "bit")]
        [Required]
        [Display(Name = "Read only")]
        public bool ReadOnly { get; set; }

        [Column(@"Deleted", Order = 20, TypeName = "bit")]
        [Required]
        [Display(Name = "Deleted")]
        public bool Deleted { get; set; }

        public virtual AspNetUsers AspNetUsers1 { get; set; }
        public virtual System.Collections.Generic.ICollection<AspNetUserClaims> AspNetUserClaims { get; set; }
        public virtual System.Collections.Generic.ICollection<AspNetUserLogins> AspNetUserLogins { get; set; }
        public virtual System.Collections.Generic.ICollection<AspNetUserRoles> AspNetUserRoles { get; set; }


        [ForeignKey("Id")] public virtual AspNetUsers AspNetUsers_Id { get; set; }

        public AspNetUsers()
        {
            Id = System.Guid.NewGuid().ToString();
            EntryDate = System.DateTime.Now;
            EmailConfirmed = true;
            PhoneNumberConfirmed = true;
            TwoFactorEnabled = false;
            LockoutEnabled = false;
            AccessFailedCount = 0;
            Active = false;
            ReadOnly = false;
            Deleted = false;
            AspNetUserClaims = new System.Collections.Generic.List<AspNetUserClaims>();
            AspNetUserLogins = new System.Collections.Generic.List<AspNetUserLogins>();
            AspNetUserRoles = new System.Collections.Generic.List<AspNetUserRoles>();
        }
    }

}

