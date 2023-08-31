using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("ClientBusinessOffer", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ClientBusinessOffer
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "int")]
        [Index(@"PK_ClientBusinessOffer", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column(@"CompanyId", Order = 2, TypeName = "int")]
        [Required]
        [Display(Name = "Company ID")]
        public int CompanyId { get; set; }

        [Column(@"OfferTypeId", Order = 3, TypeName = "int")]
        [Required]
        [Display(Name = "Offer type ID")]
        public int OfferTypeId { get; set; }

        [Column(@"Name", Order = 4, TypeName = "varchar")]
        [MaxLength(120)]
        [StringLength(120)]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Column(@"Description", Order = 5, TypeName = "varchar")]
        [MaxLength(1000)]
        [StringLength(1000)]
        [Display(Name = "Description")]
        public string Description { get; set; }

        [Column(@"Characteristics", Order = 6, TypeName = "varchar")]
        [MaxLength(3000)]
        [StringLength(3000)]
        [Display(Name = "Characteristics")]
        public string Characteristics { get; set; }

        [Column(@"Active", Order = 7, TypeName = "bit")]
        [Required]
        [Display(Name = "Active")]
        public bool Active { get; set; }

        [Column(@"EntryDate", Order = 8, TypeName = "smalldatetime")]
        [Required]
        [Display(Name = "Entry date")]
        public System.DateTime EntryDate { get; set; }

        public virtual System.Collections.Generic.ICollection<SeoCampaign> SeoCampaign { get; set; }


        [ForeignKey("CompanyId")] public virtual ClientCompany ClientCompany { get; set; }

        [ForeignKey("OfferTypeId")] public virtual BusinessTypeOffer BusinessTypeOffer { get; set; }

        public ClientBusinessOffer()
        {
            Active = true;
            EntryDate = System.DateTime.Now;
            SeoCampaign = new System.Collections.Generic.List<SeoCampaign>();
        }
    }

}

