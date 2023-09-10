using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace D12.ChatGPT.WebAdmin.Models
{
    public class ErrorDetail
    {
        public string message { get; set; }
        public string type { get; set; }
        public string param { get; set; }
        public string code { get; set; }
    }
}