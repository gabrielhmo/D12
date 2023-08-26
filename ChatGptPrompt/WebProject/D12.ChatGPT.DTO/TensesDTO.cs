namespace D12.ChatGPT.DTO
{
    public class TensesDTO
    {
        public int Id { get; set; }
        public string Tense { get; set; }
        public bool Active { get; set; }

        public TensesDTO()
        {
            Tense = "1";
            Active = true;
        }
    }
}