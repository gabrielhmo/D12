namespace D12.ChatGPT.WebAdmin.Models
{
    public class UpdatePoliciesViewModel
    {
        public string RolId { get; set; }
        public short[] SiteMapId { get; set; }
        public bool Read { get; set; }
        public bool Write { get; set; }

        public UpdatePoliciesViewModel()
        {
            this.RolId = string.Empty;
            this.SiteMapId = null;
            this.Read = false;
            this.Write = false;
        }

    }
}