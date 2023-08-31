using OfficeOpenXml.Style;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Windows.Media;

namespace D12.ChatGPT.WebAdmin.ViewModels
{
    public class ChatGptPromptViewModel
    {
        [Key]
        [Display(Name = "Id")]
        public long Id { get; set; }

        [Required]
        [Display(Name = "Seo campaign ID")]
        public long SeoCampaignId { get; set; }

        [Required]
        [Display(Name = "Chat gptr ol ID")]
        public int ChatGptRolId { get; set; }

        [Required]
        [Display(Name = "Control type ID")]
        public int ControlTypeId { get; set; }

        [Required]
        [MaxLength(3)]
        [StringLength(3)]
        [Display(Name = "Language code")]
        public string LanguageCode { get; set; }

        [Display(Name = "Tense ID")]
        public int? TenseId { get; set; }

        [Required]
        [MaxLength(80)]
        [StringLength(80)]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Required]
        [Display(Name = "Prompt")]
        public string Prompt { get; set; }

        [Display(Name = "Min Char length")]
        public int? MinLength { get; set; }

        [Display(Name = "Max Char length")]
        public int? MaxLength { get; set; }

        [Display(Name = "Min Word length")]
        public int? MinWord { get; set; }

        [Display(Name = "Max Word length")]
        public int? MaxWord { get; set; }

        [Required]
        [Display(Name = "Active")]
        public bool Active { get; set; }
    }
}