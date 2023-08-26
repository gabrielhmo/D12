using System.ComponentModel.DataAnnotations;

namespace D12.ChatGPT.WebAdmin.ViewModels
{
    public class ClientViewModel
    {
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [MaxLength(50)]
        [StringLength(50)]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [MaxLength(80)]
        [StringLength(80)]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Display(Name = "Active")]
        public bool Active { get; set; }
    }
}