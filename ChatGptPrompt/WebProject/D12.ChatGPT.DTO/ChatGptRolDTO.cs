namespace D12.ChatGPT.DTO
{
    public class ChatGptRolDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }

        public ChatGptRolDTO()
        {
            Active = true;
        }
    }
}