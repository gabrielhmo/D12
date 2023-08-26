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
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Display(Name = "Industry")]
        public string Industry { get; set; }

        [Display(Name = "Activity")]
        public string Activity { get; set; }

        [Display(Name = "Active")]
        public bool Active { get; set; }
    }
}