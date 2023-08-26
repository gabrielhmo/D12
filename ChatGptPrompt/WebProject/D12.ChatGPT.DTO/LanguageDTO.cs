namespace D12.ChatGPT.DTO
{
    public class LanguageDTO
    {
        public string Code { get; set; }
        public string Label { get; set; }
        public bool Active { get; set; }

        public LanguageDTO()
        {
            Active = true;
        }
    }
}