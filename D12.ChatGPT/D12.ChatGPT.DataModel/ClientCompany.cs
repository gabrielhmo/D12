namespace D12.ChatGPT.DataModel
{

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ClientCompany
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public string Name { get; set; }
        public string Industry { get; set; }
        public string Activity { get; set; }
        public bool Active { get; set; }
        public System.DateTime EntryDate { get; set; }

        public virtual System.Collections.Generic.ICollection<ClientBusinessOffer> ClientBusinessOffer { get; set; }


        public virtual Client Client { get; set; }

        public ClientCompany()
        {
            Active = true;
            EntryDate = System.DateTime.Now;
            ClientBusinessOffer = new System.Collections.Generic.List<ClientBusinessOffer>();
        }
    }

}

