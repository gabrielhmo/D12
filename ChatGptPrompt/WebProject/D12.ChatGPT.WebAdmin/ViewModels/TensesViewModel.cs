using OfficeOpenXml.Style;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Windows.Media;

namespace D12.ChatGPT.WebAdmin.ViewModels
{
    public class TensesViewModel
    {
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        [StringLength(50)]
        [Display(Name = "Tense")]
        public string Tense { get; set; }

        [Required]
        [Display(Name = "Active")]
        public bool Active { get; set; }

    }
}