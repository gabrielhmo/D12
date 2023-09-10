using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("ChatGPTPromptLog", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ChatGptPromptLog
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "bigint")]
        [Index(@"PK_ChatGPTPromptLog", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [Key]
        [Display(Name = "Id")]
        public long Id { get; set; }

        [Column(@"CampaignId", Order = 2, TypeName = "bigint")]
        [Required]
        [Display(Name = "Campaign ID")]
        public long CampaignId { get; set; }

        [Column(@"Message", Order = 3, TypeName = "varchar")]
        [Required]
        [MaxLength(1000)]
        [StringLength(1000)]
        [Display(Name = "Message")]
        public string Message { get; set; }

        [Column(@"Type", Order = 4, TypeName = "varchar")]
        [MaxLength(150)]
        [StringLength(150)]
        [Display(Name = "Type")]
        public string Type { get; set; }

        [Column(@"Code", Order = 5, TypeName = "varchar")]
        [MaxLength(150)]
        [StringLength(150)]
        [Display(Name = "Code")]
        public string Code { get; set; }

        [Column(@"Param", Order = 6, TypeName = "varchar")]
        [MaxLength(150)]
        [StringLength(150)]
        [Display(Name = "Param")]
        public string Param { get; set; }

        [Column(@"EntryDate", Order = 7, TypeName = "smalldatetime")]
        [Required]
        [Display(Name = "Entry date")]
        public System.DateTime EntryDate { get; set; }


        [ForeignKey("CampaignId")] public virtual SeoCampaign SeoCampaign { get; set; }

        public ChatGptPromptLog()
        {
            EntryDate = System.DateTime.Now;
        }
    }

}

