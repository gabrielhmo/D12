using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("Client", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class Client
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "int")]
        [Index(@"PK_Client", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column(@"Name", Order = 2, TypeName = "varchar")]
        [Index(@"UK_Client_Name", 1, IsUnique = true, IsClustered = false)]
        [Required]
        [MaxLength(50)]
        [StringLength(50)]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Column(@"Email", Order = 3, TypeName = "varchar")]
        [Index(@"UK_Client_Email", 1, IsUnique = true, IsClustered = false)]
        [Required]
        [MaxLength(80)]
        [StringLength(80)]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Column(@"Active", Order = 4, TypeName = "bit")]
        [Required]
        [Display(Name = "Active")]
        public bool Active { get; set; }

        [Column(@"EntryDate", Order = 5, TypeName = "smalldatetime")]
        [Required]
        [Display(Name = "Entry date")]
        public System.DateTime EntryDate { get; set; }

        public virtual System.Collections.Generic.ICollection<ClientCompany> ClientCompany { get; set; }

        public Client()
        {
            Active = true;
            EntryDate = System.DateTime.Now;
            ClientCompany = new System.Collections.Generic.List<ClientCompany>();
        }
    }

}

