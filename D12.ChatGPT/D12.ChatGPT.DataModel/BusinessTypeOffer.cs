namespace D12.ChatGPT.DataModel
{

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class BusinessTypeOffer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }

        public virtual System.Collections.Generic.ICollection<ClientBusinessOffer> ClientBusinessOffer { get; set; }

        public BusinessTypeOffer()
        {
            Active = true;
            ClientBusinessOffer = new System.Collections.Generic.List<ClientBusinessOffer>();
        }
    }

}

