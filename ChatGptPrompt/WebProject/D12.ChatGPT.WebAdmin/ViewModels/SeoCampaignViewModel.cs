using OfficeOpenXml.Style;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Windows.Media;

namespace D12.ChatGPT.WebAdmin.ViewModels
{
    public class SeoCampaignViewModel
    {
        [Key]
        [Display(Name = "Id")]
        public long Id { get; set; }

        [Required]
        [Display(Name = "Company")]
        public int CompanyId { get; set; }

        [Required]
        [Display(Name = "Business offer")]
        public int BusinessOfferId { get; set; }

        [Required]
        [MaxLength(120)]
        [StringLength(120)]
        [Display(Name = "Campaign Name")]
        public string Name { get; set; }

        [MaxLength(500)]
        [StringLength(500)]
        [Display(Name = "Description")]
        public string Description { get; set; }

        [MaxLength(120)]
        [StringLength(120)]
        [Display(Name = "Market")]
        public string Market { get; set; }

        [MaxLength(50)]
        [StringLength(50)]
        [Display(Name = "Primary keyword")]
        public string PrimaryKeyword { get; set; }

        [MaxLength(500)]
        [StringLength(500)]
        [Display(Name = "Keywords")]
        public string Keywords { get; set; }

        [Display(Name = "Active")]
        public bool Active { get; set; }
    }
}