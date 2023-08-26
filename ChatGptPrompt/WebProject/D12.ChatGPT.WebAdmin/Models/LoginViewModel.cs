using System.ComponentModel.DataAnnotations;

namespace D12.ChatGPT.WebAdmin.Models
{
    public class LoginViewModel
    {
        [Required]
        [Display(Name = "UserName")]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        public bool RememberMe { get; set; }
        public string ReturnUrl { get; set; }

        public LoginViewModel()
        {
            RememberMe = true;
        }

    }
}
