using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("ClientCompany", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ClientCompany
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "int")]
        [Index(@"PK_ClientCompany", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column(@"ClientId", Order = 2, TypeName = "int")]
        [Index(@"UK_ClientCompany_ClientId_Name", 1, IsUnique = true, IsClustered = false)]
        [Required]
        [Display(Name = "Client ID")]
        public int ClientId { get; set; }

        [Column(@"Name", Order = 3, TypeName = "varchar")]
        [Index(@"UK_ClientCompany_ClientId_Name", 2, IsUnique = true, IsClustered = false)]
        [Required]
        [MaxLength(120)]
        [StringLength(120)]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Column(@"Industry", Order = 4, TypeName = "varchar")]
        [MaxLength(500)]
        [StringLength(500)]
        [Display(Name = "Industry")]
        public string Industry { get; set; }

        [Column(@"Activity", Order = 5, TypeName = "varchar")]
        [MaxLength(500)]
        [StringLength(500)]
        [Display(Name = "Activity")]
        public string Activity { get; set; }

        [Column(@"Active", Order = 6, TypeName = "bit")]
        [Required]
        [Display(Name = "Active")]
        public bool Active { get; set; }

        [Column(@"EntryDate", Order = 7, TypeName = "smalldatetime")]
        [Required]
        [Display(Name = "Entry date")]
        public System.DateTime EntryDate { get; set; }

        public virtual System.Collections.Generic.ICollection<ClientBusinessOffer> ClientBusinessOffer { get; set; }
        public virtual System.Collections.Generic.ICollection<SeoCampaign> SeoCampaign { get; set; }


        [ForeignKey("ClientId")] public virtual Client Client { get; set; }

        public ClientCompany()
        {
            Active = true;
            EntryDate = System.DateTime.Now;
            SeoCampaign = new System.Collections.Generic.List<SeoCampaign>();
            ClientBusinessOffer = new System.Collections.Generic.List<ClientBusinessOffer>();
        }
    }

}

