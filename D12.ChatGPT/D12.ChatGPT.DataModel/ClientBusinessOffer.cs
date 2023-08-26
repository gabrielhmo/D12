namespace D12.ChatGPT.DataModel
{

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ClientBusinessOffer
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public int OfferTypeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Characteristics { get; set; }
        public bool Active { get; set; }
        public System.DateTime EntryDate { get; set; }

        public virtual System.Collections.Generic.ICollection<SeoCampaign> SeoCampaign { get; set; }


        public virtual BusinessTypeOffer BusinessTypeOffer { get; set; }

        public virtual ClientCompany ClientCompany { get; set; }

        public ClientBusinessOffer()
        {
            Active = true;
            EntryDate = System.DateTime.Now;
            SeoCampaign = new System.Collections.Generic.List<SeoCampaign>();
        }
    }

}

