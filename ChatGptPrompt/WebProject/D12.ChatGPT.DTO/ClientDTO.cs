using System.Collections.Generic;

namespace D12.ChatGPT.DTO
{
    public class ClientDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool Active { get; set; }

        public ICollection<ClientCompanyDTO> ClientCompany { get; set; }

        public ClientDTO()
        {
            Active = true;
        }
    }
}
