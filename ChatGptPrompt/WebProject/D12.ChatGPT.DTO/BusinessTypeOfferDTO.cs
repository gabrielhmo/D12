namespace D12.ChatGPT.DTO
{
    public class BusinessTypeOfferDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }

        public BusinessTypeOfferDTO()
        {
            Active = true;
        }
    }
}
