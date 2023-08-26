namespace D12.ChatGPT.DataModel
{

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class Client
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool Active { get; set; }
        public System.DateTime EntryDate { get; set; }

        public virtual System.Collections.Generic.ICollection<ClientCompany> ClientCompany { get; set; }

        public Client()
        {
            Active = true;
            EntryDate = System.DateTime.Now;
            ClientCompany = new System.Collections.Generic.List<ClientCompany>();
        }
    }

}

