namespace D12.ChatGPT.DTO
{
    public class SiteMapRolPolicyDTO
    {
        public int SiteMapId { get; set; }
        public string SiteMapName { get; set; }
        public bool Read { get; set; } = false;
        public bool Write { get; set; } = false;
    }
}
