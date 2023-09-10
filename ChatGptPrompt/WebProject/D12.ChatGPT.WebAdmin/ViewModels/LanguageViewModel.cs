using OfficeOpenXml.Style;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Windows.Media;

namespace D12.ChatGPT.WebAdmin.ViewModels
{
    public class LanguageViewModel
    {
        [MaxLength(3)]
        [StringLength(3)]
        [Key]
        [Display(Name = "Code")]
        public string Code { get; set; }

        [Required]
        [MaxLength(30)]
        [StringLength(30)]
        [Display(Name = "Label")]
        public string Label { get; set; }

        [Required]
        [Display(Name = "Active")]
        public bool Active { get; set; }
    }
}