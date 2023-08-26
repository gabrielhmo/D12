using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("SEOCampaign", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class SeoCampaign
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "bigint")]
        [Index(@"PK_SEOCampaign", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [Key]
        [Display(Name = "Id")]
        public long Id { get; set; }

        [Column(@"CompanyId", Order = 2, TypeName = "int")]
        [Required]
        [Display(Name = "Company ID")]
        public int CompanyId { get; set; }

        [Column(@"BusinessOfferId", Order = 3, TypeName = "int")]
        [Required]
        [Display(Name = "Business offer ID")]
        public int BusinessOfferId { get; set; }

        [Column(@"Name", Order = 4, TypeName = "varchar")]
        [Required]
        [MaxLength(120)]
        [StringLength(120)]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Column(@"Description", Order = 5, TypeName = "varchar")]
        [MaxLength(500)]
        [StringLength(500)]
        [Display(Name = "Description")]
        public string Description { get; set; }

        [Column(@"Market", Order = 6, TypeName = "varchar")]
        [MaxLength(120)]
        [StringLength(120)]
        [Display(Name = "Market")]
        public string Market { get; set; }

        [Column(@"PrimaryKeyword", Order = 7, TypeName = "varchar")]
        [MaxLength(50)]
        [StringLength(50)]
        [Display(Name = "Primary keyword")]
        public string PrimaryKeyword { get; set; }

        [Column(@"Keywords", Order = 8, TypeName = "varchar")]
        [MaxLength(500)]
        [StringLength(500)]
        [Display(Name = "Keywords")]
        public string Keywords { get; set; }

        [Column(@"Active", Order = 9, TypeName = "bit")]
        [Required]
        [Display(Name = "Active")]
        public bool Active { get; set; }

        [Column(@"EntryDate", Order = 10, TypeName = "smalldatetime")]
        [Required]
        [Display(Name = "Entry date")]
        public System.DateTime EntryDate { get; set; }

        public virtual System.Collections.Generic.ICollection<ChatGptContext> ChatGptContext { get; set; }


        [ForeignKey("BusinessOfferId")] public virtual ClientBusinessOffer ClientBusinessOffer { get; set; }

        [ForeignKey("CompanyId")] public virtual ClientCompany ClientCompany { get; set; }

        public SeoCampaign()
        {
            Active = true;
            EntryDate = System.DateTime.Now;
            ChatGptContext = new System.Collections.Generic.List<ChatGptContext>();
        }
    }

}

