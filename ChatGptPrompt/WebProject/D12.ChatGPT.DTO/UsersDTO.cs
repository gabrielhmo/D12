using System;
using System.Collections.Generic;

namespace D12.ChatGPT.DTO
{
    public class UsersDTO
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string JobTitle { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string UserName { get; set; }
        public DateTime? LastAccess { get; set; }
        public DateTime EntryDate { get; set; }
        public bool Active { get; set; }
        public bool ReadOnly { get; set; }
        public bool Deleted { get; set; }
        public bool IsAdmin { get; set; }
        public ICollection<RolDTO> Roles { get; set; }
    }
}
