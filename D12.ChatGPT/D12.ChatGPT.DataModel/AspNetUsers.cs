namespace D12.ChatGPT.DataModel
{

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class AspNetUsers
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string JobTitle { get; set; }
        public System.DateTime? LastAccess { get; set; }
        public System.DateTime EntryDate { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string PasswordHash { get; set; }
        public string SecurityStamp { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public System.DateTime? LockoutEndDateUtc { get; set; }
        public bool LockoutEnabled { get; set; }
        public int AccessFailedCount { get; set; }
        public string UserName { get; set; }
        public bool Active { get; set; }
        public bool ReadOnly { get; set; }
        public bool Deleted { get; set; }

        public virtual AspNetUsers AspNetUsers1 { get; set; }
        public virtual System.Collections.Generic.ICollection<AspNetUserClaims> AspNetUserClaims { get; set; }
        public virtual System.Collections.Generic.ICollection<AspNetUserLogins> AspNetUserLogins { get; set; }
        public virtual System.Collections.Generic.ICollection<AspNetUserRoles> AspNetUserRoles { get; set; }


        public virtual AspNetUsers AspNetUsers_Id { get; set; }

        public AspNetUsers()
        {
            Id = System.Guid.NewGuid().ToString();
            EntryDate = System.DateTime.Now;
            EmailConfirmed = true;
            PhoneNumberConfirmed = true;
            TwoFactorEnabled = false;
            LockoutEnabled = false;
            AccessFailedCount = 0;
            Active = false;
            ReadOnly = false;
            Deleted = false;
            AspNetUserClaims = new System.Collections.Generic.List<AspNetUserClaims>();
            AspNetUserLogins = new System.Collections.Generic.List<AspNetUserLogins>();
            AspNetUserRoles = new System.Collections.Generic.List<AspNetUserRoles>();
        }
    }

}

