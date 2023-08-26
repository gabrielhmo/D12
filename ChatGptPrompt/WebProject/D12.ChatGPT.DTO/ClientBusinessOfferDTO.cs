using System;
using System.Collections.Generic;

namespace D12.ChatGPT.DTO
{
    public class ClientBusinessOfferDTO
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public int OfferTypeId { get; set; }
        public string OfferTypeName { get; set; }
        public string CompanyName { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Characteristics { get; set; }
        public bool Active { get; set; }
        public DateTime EntryDate { get; set; }

        public ClientBusinessOfferDTO()
        {
            Active = true;
            EntryDate = System.DateTime.Now;
        }
    }
}