using OfficeOpenXml.Style;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Windows.Media;

namespace D12.ChatGPT.WebAdmin.ViewModels
{
    public class ControlTypeViewModel
    {
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [MaxLength(50)]
        [StringLength(50)]
        [Display(Name = "Label")]
        public string Label { get; set; }

        [Required]
        [MaxLength(50)]
        [StringLength(50)]
        [Display(Name = "Type")]
        public string Type { get; set; }

        [Required]
        [Display(Name = "Active")]
        public bool Active { get; set; }
    }
}