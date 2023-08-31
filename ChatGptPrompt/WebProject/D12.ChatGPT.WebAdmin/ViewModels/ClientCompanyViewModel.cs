using System.ComponentModel.DataAnnotations;

namespace D12.ChatGPT.WebAdmin.ViewModels
{
    public class ClientCompanyViewModel
    {
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Key]
        [Display(Name = "ClientId")]
        public int ClientId { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [MaxLength(120)]
        [StringLength(120)]
        [Display(Name = "Name  (120 chars max)")]
        public string Name { get; set; }

        [MaxLength(500)]
        [StringLength(500)]
        [Display(Name = "Industry  (500 chars max)")]
        public string Industry { get; set; }

        [MaxLength(500)]
        [StringLength(500)]
        [Display(Name = "Activity  (500 chars max)")]
        public string Activity { get; set; }

        [Display(Name = "Active")]
        public bool Active { get; set; }
    }
}