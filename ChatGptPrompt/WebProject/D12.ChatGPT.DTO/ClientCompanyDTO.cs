using System;
using System.Collections.Generic;

namespace D12.ChatGPT.DTO
{
    public class ClientCompanyDTO
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public string ClientName { get; set; }
        public string Name { get; set; }
        public string Industry { get; set; }
        public string Activity { get; set; }
        public bool Active { get; set; }
        public DateTime EntryDate { get; set; }

        public ClientCompanyDTO()
        {
            Active = true;
            EntryDate = DateTime.Now;
        }
    }
}