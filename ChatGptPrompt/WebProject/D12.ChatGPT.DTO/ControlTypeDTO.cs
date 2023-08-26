namespace D12.ChatGPT.DTO
{
    public class ControlTypeDTO
    {
        public int Id { get; set; }
        public string Label { get; set; }
        public string Type { get; set; }
        public bool Active { get; set; }

        public ControlTypeDTO()
        {
            Active = true;
        }
    }
}