namespace D12.ChatGPT.WebAdmin.Models
{
    public class UpdateUserRoleViewModel
    {
        public string UserId { get; set; }
        public string RoleId { get; set; }
        public bool State { get; set; }

        public UpdateUserRoleViewModel()
        {
            this.UserId = string.Empty;
            this.RoleId = string.Empty;
            this.State = false;
        }
    }
}