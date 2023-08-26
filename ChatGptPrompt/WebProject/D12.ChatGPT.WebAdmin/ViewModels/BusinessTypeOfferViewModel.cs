using System.ComponentModel.DataAnnotations;

namespace D12.ChatGPT.WebAdmin.ViewModels
{
    public class BusinessTypeOfferViewModel
    {
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name Type is required")]
        [MaxLength(50)]
        [StringLength(50)]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Display(Name = "Active")]
        public bool Active { get; set; }
    }
}